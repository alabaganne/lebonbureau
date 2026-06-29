"use client";

/* Admin dashboard — view and process orders: stats, active/archive segments,
   status tabs, search, status workflow, and pagination. */

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAdmin, signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { formatDT } from "@/lib/data";
import { useToast } from "@/lib/toast";
import { seedDemo } from "@/lib/demo";
import {
  getOrders,
  setOrderStatus,
  PROGRESS,
  SEGMENTS,
  STATUS,
  type Order,
  type OrderStatus,
} from "@/lib/orders";
import {
  PlusIcon,
  LogoutIcon,
  SearchIcon,
  ExternalIcon,
  PinSmallIcon,
  NoteIcon,
  CheckIcon,
  ClockCircleIcon,
  ArchiveIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/Icons";

type Segment = "actives" | "archive";
const PAGE_SIZE = 4;
const TAB_LABELS: Record<OrderStatus, string> = {
  nouvelle: "Nouvelles", vue: "Vues", appelee: "Appelées", livree: "Livrées", annulee: "Annulées",
};

function fmtDate(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const od = new Date(iso);
  od.setHours(0, 0, 0, 0);
  const diff = Math.round((today.getTime() - od.getTime()) / 86400000);
  const time = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  let day: string;
  if (diff === 0) day = "Aujourd'hui";
  else if (diff === 1) day = "Hier";
  else day = d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
  return day + " · " + time;
}

function fmtPhone(p: string): string {
  const d = (p || "").replace(/\D/g, "");
  if (d.length === 8) return "+216 " + d.slice(0, 2) + " " + d.slice(2, 5) + " " + d.slice(5);
  return "+216 " + p;
}
const telHref = (p: string) => "tel:+216" + (p || "").replace(/\D/g, "");

function pageWindow(current: number, total: number): (number | "…")[] {
  const out: (number | "…")[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) out.push(i);
    return out;
  }
  out.push(1);
  if (current > 4) out.push("…");
  const s = Math.max(2, current - 1);
  const e = Math.min(total - 1, current + 1);
  for (let i = s; i <= e; i++) out.push(i);
  if (current < total - 3) out.push("…");
  out.push(total);
  return out;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();

  const [ready, setReady] = useState(false);
  const [orders, setOrdersState] = useState<Order[]>([]);
  const [segment, setSegment] = useState<Segment>("actives");
  const [activeTab, setActiveTab] = useState<"toutes" | OrderStatus>("toutes");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const refresh = async () => setOrdersState(await getOrders());

  useEffect(() => {
    let active = true;
    (async () => {
      if (!(await isAdmin())) {
        router.replace("/admin/login");
        return;
      }
      if (!active) return;
      await refresh();
      setReady(true);
    })();
    // Bounce back to login if the session ends (sign-out, expiry) in any tab.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/admin/login");
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (!ready) return <div className="admin-body" />;

  // ---- Derived data ----
  const by = (s: OrderStatus) => orders.filter((o) => o.status === s).length;
  const revenue = orders
    .filter((o) => o.status !== "annulee")
    .reduce((n, o) => n + o.total, 0);
  const stats = [
    { n: orders.length, l: "Commandes", accent: false },
    { n: by("nouvelle"), l: "Nouvelles", accent: true },
    { n: by("vue") + by("appelee"), l: "À traiter", accent: false },
    { n: by("livree"), l: "Livrées", accent: false },
    { n: formatDT(revenue), l: "Chiffre d'affaires", accent: true },
  ];

  const countInSeg = (seg: Segment) =>
    orders.filter((o) => SEGMENTS[seg].statuses.includes(o.status)).length;

  const inSeg = orders.filter((o) => SEGMENTS[segment].statuses.includes(o.status));
  const countBy = (s: OrderStatus) => inSeg.filter((o) => o.status === s).length;
  const tabs: { id: "toutes" | OrderStatus; label: string; count: number }[] = [
    { id: "toutes", label: "Toutes", count: inSeg.length },
    ...SEGMENTS[segment].statuses.map((s) => ({ id: s, label: TAB_LABELS[s], count: countBy(s) })),
  ];

  const matches = (o: Order) => {
    if (!SEGMENTS[segment].statuses.includes(o.status)) return false;
    if (activeTab !== "toutes" && o.status !== activeTab) return false;
    if (!query) return true;
    const hay = (
      o.num + " " + o.firstName + " " + o.lastName + " " + o.phone + " " +
      o.city + " " + o.gov + " " + o.items.map((i) => i.name).join(" ")
    ).toLowerCase();
    return hay.indexOf(query) !== -1;
  };

  const list = orders.filter(matches);
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const slice = list.slice(start, start + PAGE_SIZE);

  const total = orders.length;
  const headSub =
    total + " commande" + (total > 1 ? "s" : "") + " au total · cliquez sur un bureau pour ouvrir sa fiche.";

  // ---- Actions ----
  async function changeStatus(num: string, status: OrderStatus) {
    await setOrderStatus(num, status);
    await refresh();
    const moved = !SEGMENTS[segment].statuses.includes(status);
    toast(`${num} → ${STATUS[status].label}${moved ? " · déplacée vers l'archive" : ""}`);
  }
  async function onSeed() {
    await seedDemo();
    await refresh();
    toast("Commandes de démonstration ajoutées");
  }
  async function onLogout() {
    await signOut();
    router.replace("/admin/login");
  }
  function selectSegment(seg: Segment) {
    setSegment(seg);
    setActiveTab("toutes");
    setPage(1);
  }

  return (
    <div className="admin-body">
      {/* TOPBAR */}
      <header className="admin-bar">
        <div className="wrap admin-bar-inner">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link className="brand" href="/admin">
              Le<span className="dot">Bon</span>Bureau<span className="dot">.</span>
            </Link>
            <span className="admin-tag">Admin</span>
          </div>
          <div className="admin-bar-actions">
            <span className="who">
              Connecté en tant qu&apos;<strong style={{ color: "#fff" }}>admin</strong>
            </span>
            <a className="logout-btn" href="/" target="_blank" rel="noopener noreferrer">
              Voir la boutique
            </a>
            <button className="logout-btn" onClick={onLogout}>
              <LogoutIcon size={15} />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="wrap">
          <div className="admin-head">
            <div>
              <h1>Commandes</h1>
              <p>{headSub}</p>
            </div>
            <button className="step-btn" onClick={onSeed} title="Ajouter des commandes de démonstration">
              <PlusIcon size={15} />
              Données démo
            </button>
          </div>

          {/* Stats */}
          <div className="stats">
            {stats.map((c) => (
              <div className={"stat" + (c.accent ? " accent" : "")} key={c.l}>
                <div className="n">{c.n}</div>
                <div className="l">{c.l}</div>
              </div>
            ))}
          </div>

          {/* Segment toggle */}
          <div className="seg-control">
            <button
              className={"seg-btn" + (segment === "actives" ? " active" : "")}
              onClick={() => selectSegment("actives")}
            >
              <ClockCircleIcon size={15} />
              Commandes actives
              <span className="seg-count">{countInSeg("actives")}</span>
            </button>
            <button
              className={"seg-btn" + (segment === "archive" ? " active" : "")}
              onClick={() => selectSegment("archive")}
            >
              <ArchiveIcon size={15} strokeWidth={1.9} />
              Archive
              <span className="seg-count">{countInSeg("archive")}</span>
            </button>
          </div>

          {/* Toolbar */}
          <div className="order-toolbar">
            <div className="tabs">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  className={"tab" + (t.id === activeTab ? " active" : "")}
                  onClick={() => {
                    setActiveTab(t.id);
                    setPage(1);
                  }}
                >
                  {t.label}
                  <span className="pill">{t.count}</span>
                </button>
              ))}
            </div>
            <div className="search-box">
              <SearchIcon size={16} />
              <input
                type="search"
                placeholder="Rechercher (nom, téléphone, ville…)"
                aria-label="Rechercher une commande"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value.trim().toLowerCase());
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* Orders */}
          <div className="orders">
            {slice.length === 0 ? (
              <div className="admin-empty">
                <div className="ic"><ArchiveIcon size={26} strokeWidth={1.6} /></div>
                <h2>Aucune commande</h2>
                <p>
                  {query || activeTab !== "toutes"
                    ? "Aucune commande ne correspond à ce filtre."
                    : segment === "archive"
                      ? "Les commandes livrées ou annulées seront archivées ici."
                      : "Les nouvelles commandes apparaîtront ici dès qu'un client validera son panier."}
                </p>
              </div>
            ) : (
              slice.map((o) => <OrderCard key={o.num} o={o} onStatus={changeStatus} />)
            )}
          </div>

          {/* Pagination */}
          {list.length > 0 && (
            <Pager
              page={safePage}
              totalPages={totalPages}
              totalCount={list.length}
              start={start}
              shown={slice.length}
              onPage={(p) => {
                setPage(p);
                const top =
                  (document.querySelector(".order-toolbar")?.getBoundingClientRect().top || 0) +
                  window.scrollY - 20;
                window.scrollTo({ top, behavior: "smooth" });
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

/* ---- Order card ---- */
function OrderCard({ o, onStatus }: { o: Order; onStatus: (num: string, s: OrderStatus) => void }) {
  const st = STATUS[o.status] || STATUS.nouvelle;
  const styleVars = { "--st-color": st.color, "--st-soft": st.soft } as CSSProperties;
  const payLabel = o.payment === "card" ? "Carte bancaire" : "À la livraison";

  return (
    <div className="order-card" style={styleVars}>
      <div className="oc-top">
        <div className="oc-field">
          <div className="oc-num">{o.num}</div>
          <div className="oc-date">{fmtDate(o.createdAt)}</div>
        </div>
        <div className="oc-field">
          <div className="k">Client</div>
          <div className="v">{o.firstName} {o.lastName}</div>
          <a className="v sub tel-link" href={telHref(o.phone)}>{fmtPhone(o.phone)}</a>
        </div>
        <div className="oc-field">
          <div className="k">Livraison</div>
          <div className="v city-line">
            <PinSmallIcon size={14} />
            {o.city}
          </div>
          <div className="v sub">{o.gov} · {o.zip}</div>
        </div>
        <div className="oc-field">
          <div className="k">Bureau(x)</div>
          <div className="desk-chips">
            {o.items.map((it, i) => (
              <a
                key={i}
                className="desk-chip"
                href={`/product/${it.id}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Ouvrir la fiche ${it.name}`}
              >
                <span className="qbadge">×{it.qty}</span>
                {it.name}
                {it.size && <span className="sz">· {it.size}</span>}
                <ExternalIcon size={13} />
              </a>
            ))}
          </div>
        </div>
        <div className="oc-field oc-status-cell" style={{ textAlign: "right" }}>
          <span className="status-badge"><span className="dot" />{st.label}</span>
          <div className="oc-total" style={{ marginTop: 8 }}>{formatDT(o.total)}</div>
        </div>
      </div>

      <div className="oc-actions">
        <div className="step-btns">
          {PROGRESS.map((sid) => {
            const reached = o.status !== "annulee" && st.idx >= STATUS[sid].idx && st.idx >= 0;
            return (
              <button
                key={sid}
                className={"step-btn" + (reached ? " done" : "")}
                onClick={() => onStatus(o.num, sid)}
              >
                {reached && <CheckIcon size={13} strokeWidth={2.4} />}
                Marquer {STATUS[sid].label.toLowerCase()}
              </button>
            );
          })}
          {o.status === "annulee" ? (
            <button className="step-btn" onClick={() => onStatus(o.num, "nouvelle")}>Rétablir</button>
          ) : (
            <button className="step-btn cancel" onClick={() => onStatus(o.num, "annulee")}>Annuler</button>
          )}
        </div>
        <div className="oc-extra" style={{ gap: 10 }}>
          <span className="pay-tag">{payLabel}</span>
          {o.notes && (
            <span className="oc-extra">
              <NoteIcon size={14} />
              {o.notes}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---- Pagination ---- */
function Pager({
  page, totalPages, totalCount, start, shown, onPage,
}: {
  page: number; totalPages: number; totalCount: number; start: number; shown: number;
  onPage: (p: number) => void;
}) {
  const info =
    totalPages <= 1
      ? totalCount + " commande" + (totalCount > 1 ? "s" : "")
      : start + 1 + "–" + (start + shown) + " sur " + totalCount;

  return (
    <div className="pagination">
      <div className="pager-info">{info}</div>
      {totalPages > 1 && (
        <div className="pager-btns">
          <button
            className="pager-btn nav"
            disabled={page === 1}
            aria-label="Page précédente"
            onClick={() => onPage(page - 1)}
          >
            <ChevronLeftIcon size={15} />
          </button>
          {pageWindow(page, totalPages).map((n, i) =>
            n === "…" ? (
              <span className="pager-ellipsis" key={"e" + i}>…</span>
            ) : (
              <button
                key={n}
                className={"pager-btn" + (n === page ? " active" : "")}
                onClick={() => onPage(n)}
              >
                {n}
              </button>
            )
          )}
          <button
            className="pager-btn nav"
            disabled={page === totalPages}
            aria-label="Page suivante"
            onClick={() => onPage(page + 1)}
          >
            <ChevronRightIcon size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
