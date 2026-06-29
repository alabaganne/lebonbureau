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

  if (!ready) return <div className="bg-sand min-h-screen flex flex-col" />;

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
    <div className="bg-sand min-h-screen flex flex-col">
      {/* TOPBAR */}
      <header className="sticky top-0 z-50 bg-ink text-white border-b border-[rgba(255,255,255,.08)]">
        <div className="wrap flex items-center justify-between h-[66px]">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link className="inline-flex items-baseline gap-0.5 font-serif text-[21px] font-semibold tracking-[-.02em] text-white" href="/admin">
              Le<span className="text-[#6fbfa6]">Bon</span>Bureau<span className="text-[#6fbfa6]">.</span>
            </Link>
            <span className="inline-flex items-center gap-[7px] text-[11.5px] font-bold tracking-[.12em] uppercase text-[#cfe7df] bg-[rgba(111,191,166,.14)] border border-[rgba(111,191,166,.3)] py-[5px] px-[11px] rounded-full ml-[14px]">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13.5px] text-[#b9b7ad]">
              Connecté en tant qu&apos;<strong style={{ color: "#fff" }}>admin</strong>
            </span>
            <a className="inline-flex items-center gap-2 bg-[rgba(255,255,255,.08)] text-white border border-[rgba(255,255,255,.16)] rounded-full py-[9px] px-4 text-[14px] font-semibold transition-[background] duration-150 ease-[ease] hover:bg-[rgba(255,255,255,.16)]" href="/" target="_blank" rel="noopener noreferrer">
              Voir la boutique
            </a>
            <button className="inline-flex items-center gap-2 bg-[rgba(255,255,255,.08)] text-white border border-[rgba(255,255,255,.16)] rounded-full py-[9px] px-4 text-[14px] font-semibold transition-[background] duration-150 ease-[ease] hover:bg-[rgba(255,255,255,.16)]" onClick={onLogout}>
              <LogoutIcon size={15} />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-[34px] pb-[70px]">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-[26px]">
            <div>
              <h1 className="font-serif text-[clamp(28px,3.4vw,40px)] leading-[1.05]">Commandes</h1>
              <p className="text-ink-soft mt-2 text-[15px]">{headSub}</p>
            </div>
            <button className="inline-flex items-center gap-[7px] border border-line bg-sand rounded-full py-2 px-[15px] text-[13.5px] font-semibold text-ink transition-all duration-[140ms] ease-[ease] hover:border-ink" onClick={onSeed} title="Ajouter des commandes de démonstration">
              <PlusIcon size={15} />
              Données démo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-[16px] mb-[30px] max-[1040px]:grid-cols-3 max-[600px]:grid-cols-2">
            {stats.map((c) => (
              <div className="bg-white border border-line rounded-card py-[18px] px-5" key={c.l}>
                <div className={"font-serif text-[32px] font-semibold leading-none tracking-[-.01em]" + (c.accent ? " text-green" : "")}>{c.n}</div>
                <div className="text-[12.5px] text-ink-faint mt-2 tracking-[.04em] uppercase font-semibold">{c.l}</div>
              </div>
            ))}
          </div>

          {/* Segment toggle */}
          <div className="inline-flex gap-[5px] bg-white border border-line rounded-full p-[5px] mb-[22px]">
            <button
              className={"inline-flex items-center gap-[9px] border-none bg-transparent cursor-pointer rounded-full py-2.5 px-5 text-[14.5px] font-semibold transition-[background,color] duration-150 ease-[ease] [&_svg]:opacity-85 " + (segment === "actives" ? "bg-ink text-white" : "text-ink-soft hover:text-ink")}
              onClick={() => selectSegment("actives")}
            >
              <ClockCircleIcon size={15} />
              Commandes actives
              <span className={"min-w-[22px] h-[22px] px-[7px] rounded-full text-[12px] font-bold inline-flex items-center justify-center " + (segment === "actives" ? "bg-[rgba(255,255,255,.22)] text-white" : "bg-sand-deep text-ink-soft")}>{countInSeg("actives")}</span>
            </button>
            <button
              className={"inline-flex items-center gap-[9px] border-none bg-transparent cursor-pointer rounded-full py-2.5 px-5 text-[14.5px] font-semibold transition-[background,color] duration-150 ease-[ease] [&_svg]:opacity-85 " + (segment === "archive" ? "bg-ink text-white" : "text-ink-soft hover:text-ink")}
              onClick={() => selectSegment("archive")}
            >
              <ArchiveIcon size={15} strokeWidth={1.9} />
              Archive
              <span className={"min-w-[22px] h-[22px] px-[7px] rounded-full text-[12px] font-bold inline-flex items-center justify-center " + (segment === "archive" ? "bg-[rgba(255,255,255,.22)] text-white" : "bg-sand-deep text-ink-soft")}>{countInSeg("archive")}</span>
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-[16px] flex-wrap mb-5">
            <div className="flex flex-wrap gap-[9px]">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  className={"inline-flex items-center gap-2 border rounded-full py-2 px-4 text-[14px] font-medium transition-all duration-150 ease-[ease] " + (t.id === activeTab ? "bg-ink text-white border-ink" : "bg-white border-line text-ink-soft hover:border-ink hover:text-ink")}
                  onClick={() => {
                    setActiveTab(t.id);
                    setPage(1);
                  }}
                >
                  {t.label}
                  <span className={"min-w-[20px] h-5 px-1.5 rounded-full text-[11.5px] font-bold inline-flex items-center justify-center " + (t.id === activeTab ? "bg-[rgba(255,255,255,.2)] text-white" : "bg-sand-deep text-ink-soft")}>{t.count}</span>
                </button>
              ))}
            </div>
            <div className="relative [&>svg]:absolute [&>svg]:left-[14px] [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:text-ink-faint max-[600px]:w-full">
              <SearchIcon size={16} />
              <input
                type="search"
                placeholder="Rechercher (nom, téléphone, ville…)"
                aria-label="Rechercher une commande"
                className="border border-line bg-white rounded-full py-2.5 pr-4 pl-[38px] font-[inherit] text-[14px] w-[240px] text-ink focus:outline-none focus:border-green focus:shadow-[0_0_0_3px_var(--color-green-soft)] max-[600px]:w-full"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value.trim().toLowerCase());
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* Orders */}
          <div className="flex flex-col gap-[16px]">
            {slice.length === 0 ? (
              <div className="text-center py-[70px] px-6 bg-white border border-dashed border-line rounded-card-lg">
                <div className="w-[60px] h-[60px] rounded-full bg-sand grid place-items-center mx-auto mb-[18px] text-ink-faint"><ArchiveIcon size={26} strokeWidth={1.6} /></div>
                <h2 className="font-serif text-[24px] mb-2">Aucune commande</h2>
                <p className="text-ink-soft mx-auto max-w-[40ch]">
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
    <div className="bg-[var(--st-soft,#fff)] border border-line rounded-card-lg overflow-hidden" style={styleVars}>
      <div className="grid grid-cols-[1.1fr_1.2fr_1fr_1.1fr_auto] gap-[18px] items-center py-[18px] px-[22px] max-[1040px]:grid-cols-2 max-[1040px]:gap-[16px_20px] max-[600px]:grid-cols-1">
        <div>
          <div className="font-serif text-[18px] font-semibold">{o.num}</div>
          <div className="text-[12.5px] text-ink-faint mt-[3px]">{fmtDate(o.createdAt)}</div>
        </div>
        <div>
          <div className="text-[11px] tracking-[.1em] uppercase font-semibold text-ink-faint mb-1">Client</div>
          <div className="text-[15px] font-semibold text-ink">{o.firstName} {o.lastName}</div>
          <a className="text-[13.5px] font-bold text-green hover:underline" href={telHref(o.phone)}>{fmtPhone(o.phone)}</a>
        </div>
        <div>
          <div className="text-[11px] tracking-[.1em] uppercase font-semibold text-ink-faint mb-1">Livraison</div>
          <div className="text-[15px] font-semibold text-ink inline-flex items-center gap-[6px] [&>svg]:text-ink-faint">
            <PinSmallIcon size={14} />
            {o.city}
          </div>
          <div className="text-[13.5px] font-medium text-ink-soft">{o.gov} · {o.zip}</div>
        </div>
        <div>
          <div className="text-[11px] tracking-[.1em] uppercase font-semibold text-ink-faint mb-1">Bureau(x)</div>
          <div className="flex flex-wrap gap-[7px]">
            {o.items.map((it, i) => (
              <a
                key={i}
                className="inline-flex items-center gap-[7px] bg-sand border border-line rounded-full py-[5px] pr-[11px] pl-[7px] text-[13px] font-semibold text-ink transition-[border-color,background] duration-150 ease-[ease] hover:border-green hover:bg-green-soft [&>svg]:text-ink-faint"
                href={`/product/${it.id}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Ouvrir la fiche ${it.name}`}
              >
                <span className="bg-ink text-white text-[11px] font-bold rounded-full py-px px-[7px]">×{it.qty}</span>
                {it.name}
                {it.size && <span className="text-ink-faint font-medium">· {it.size}</span>}
                <ExternalIcon size={13} />
              </a>
            ))}
          </div>
        </div>
        <div className="max-[1040px]:col-span-full max-[1040px]:flex max-[1040px]:justify-between max-[1040px]:items-center" style={{ textAlign: "right" }}>
          <span className="inline-flex items-center gap-[7px] text-[12.5px] font-bold py-[5px] px-3 rounded-full bg-[var(--st-color,var(--color-ink-soft))] text-white"><span className="w-[7px] h-[7px] rounded-full bg-current" />{st.label}</span>
          <div className="font-serif text-[20px] font-semibold whitespace-nowrap" style={{ marginTop: 8 }}>{formatDT(o.total)}</div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-[14px] py-[14px] px-[22px] border-t border-line bg-white flex-wrap">
        <div className="flex flex-wrap gap-2">
          {PROGRESS.map((sid) => {
            const reached = o.status !== "annulee" && st.idx >= STATUS[sid].idx && st.idx >= 0;
            return (
              <button
                key={sid}
                className={"inline-flex items-center gap-[7px] border rounded-full py-2 px-[15px] text-[13.5px] font-semibold transition-all duration-[140ms] ease-[ease] " + (reached ? "border-green bg-green text-white" : "border-line bg-sand text-ink hover:border-ink")}
                onClick={() => onStatus(o.num, sid)}
              >
                {reached && <CheckIcon size={13} strokeWidth={2.4} />}
                Marquer {STATUS[sid].label.toLowerCase()}
              </button>
            );
          })}
          {o.status === "annulee" ? (
            <button className="inline-flex items-center gap-[7px] border border-line bg-sand rounded-full py-2 px-[15px] text-[13.5px] font-semibold text-ink transition-all duration-[140ms] ease-[ease] hover:border-ink" onClick={() => onStatus(o.num, "nouvelle")}>Rétablir</button>
          ) : (
            <button className="inline-flex items-center gap-[7px] border border-line bg-sand rounded-full py-2 px-[15px] text-[13.5px] font-semibold text-ink transition-all duration-[140ms] ease-[ease] hover:border-clay hover:text-clay" onClick={() => onStatus(o.num, "annulee")}>Annuler</button>
          )}
        </div>
        <div className="flex items-center text-[13px] text-ink-soft" style={{ gap: 10 }}>
          <span className="text-[12px] font-semibold text-ink-soft bg-sand border border-line rounded-full py-1 px-[10px]">{payLabel}</span>
          {o.notes && (
            <span className="flex items-center gap-2 text-[13px] text-ink-soft [&>svg]:text-ink-faint [&>svg]:flex-none">
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
    <div className="flex items-center justify-between gap-[16px] mt-[28px] flex-wrap">
      <div className="text-[13.5px] text-ink-faint font-medium">{info}</div>
      {totalPages > 1 && (
        <div className="flex items-center gap-1.5">
          <button
            className="min-w-[40px] h-10 px-0 border border-line bg-white rounded-[11px] text-[14px] font-semibold text-ink inline-flex items-center justify-center transition-[border-color,background,color] duration-[140ms] ease-[ease] hover:enabled:border-ink disabled:opacity-40 disabled:cursor-default"
            disabled={page === 1}
            aria-label="Page précédente"
            onClick={() => onPage(page - 1)}
          >
            <ChevronLeftIcon size={15} />
          </button>
          {pageWindow(page, totalPages).map((n, i) =>
            n === "…" ? (
              <span className="px-1.5 text-ink-faint font-bold self-end" key={"e" + i}>…</span>
            ) : (
              <button
                key={n}
                className={"min-w-[40px] h-10 px-3 border rounded-[11px] text-[14px] font-semibold inline-flex items-center justify-center transition-[border-color,background,color] duration-[140ms] ease-[ease] hover:enabled:border-ink disabled:opacity-40 disabled:cursor-default " + (n === page ? "bg-ink text-white border-ink" : "border-line bg-white text-ink")}
                onClick={() => onPage(n)}
              >
                {n}
              </button>
            )
          )}
          <button
            className="min-w-[40px] h-10 px-0 border border-line bg-white rounded-[11px] text-[14px] font-semibold text-ink inline-flex items-center justify-center transition-[border-color,background,color] duration-[140ms] ease-[ease] hover:enabled:border-ink disabled:opacity-40 disabled:cursor-default"
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
