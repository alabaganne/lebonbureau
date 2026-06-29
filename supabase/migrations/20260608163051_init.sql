-- LeBonBureau initial schema: profiles (with role), orders, order_items.
-- Storefront writes go through create_order() (SECURITY DEFINER, transactional);
-- admins read/update directly under RLS gated on is_admin().

-- ---------------------------------------------------------------------------
-- profiles: app-level user table, 1:1 with auth.users, carries the role.
-- ---------------------------------------------------------------------------
create table public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  role       text not null default 'customer' check (role in ('admin','customer')),
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- Auto-create a profile (role=customer) whenever an auth user is created.
create function public.handle_new_user() returns trigger
  language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users for each row
  execute function public.handle_new_user();

-- Admin check helper used by RLS policies. SECURITY DEFINER so it can read
-- profiles without recursing through profiles' own RLS; the auth.uid() check
-- keeps it scoped to the caller.
create function public.is_admin() returns boolean
  language sql security definer set search_path = public stable as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- orders + order_items. Money columns are integer (whole DT) so they come back
-- as JSON numbers, not strings (Postgres numeric serializes as a string).
-- ---------------------------------------------------------------------------
create table public.orders (
  id         uuid primary key default gen_random_uuid(),
  num        text unique not null,
  created_at timestamptz not null default now(),
  status     text not null default 'nouvelle'
             check (status in ('nouvelle','vue','appelee','livree','annulee')),
  first_name text not null default '',
  last_name  text not null default '',
  phone      text not null default '',
  email      text not null default '',
  address    text not null default '',
  address2   text not null default '',
  city       text not null default '',
  gov        text not null default '',
  zip        text not null default '',
  landmark   text not null default '',
  notes      text not null default '',
  payment    text not null check (payment in ('cod','card')),
  total      integer not null default 0
);

create table public.order_items (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references public.orders(id) on delete cascade,
  product_id text not null,            -- CartItem.id (slug, e.g. 'atlas')
  name       text not null,
  color      text not null,
  size       text not null,
  price      integer not null,
  qty        integer not null
);
create index order_items_order_id_idx on public.order_items(order_id);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- profiles: a user reads its own row; admins read all (for future user mgmt).
create policy "own profile" on public.profiles
  for select to authenticated using ( id = (select auth.uid()) );
create policy "admin reads profiles" on public.profiles
  for select to authenticated using ( public.is_admin() );

-- orders / order_items: only admins read or mutate directly. There is no anon
-- policy, so anonymous direct reads/writes are denied — storefront inserts must
-- go through create_order() below. UPDATE carries WITH CHECK so an admin can't
-- move a row out from under the policy.
create policy "admin reads orders" on public.orders
  for select to authenticated using ( public.is_admin() );
create policy "admin updates orders" on public.orders
  for update to authenticated using ( public.is_admin() ) with check ( public.is_admin() );
create policy "admin reads order_items" on public.order_items
  for select to authenticated using ( public.is_admin() );

-- ---------------------------------------------------------------------------
-- Transactional order creation, callable by the anonymous storefront.
-- SECURITY DEFINER (runs as owner, bypassing RLS) so checkout can insert an
-- order + its items in one round trip without exposing the tables for writes.
-- ---------------------------------------------------------------------------
create function public.create_order(
  p_num text, p_status text, p_payment text,
  p_first_name text, p_last_name text, p_phone text, p_email text,
  p_address text, p_address2 text, p_city text, p_gov text, p_zip text,
  p_landmark text, p_notes text, p_total integer,
  p_items jsonb, p_created_at timestamptz default now()
) returns text
  language plpgsql security definer set search_path = public as $$
declare new_id uuid;
begin
  insert into public.orders(num,status,payment,first_name,last_name,phone,email,
    address,address2,city,gov,zip,landmark,notes,total,created_at)
  values (p_num,coalesce(nullif(p_status,''),'nouvelle'),p_payment,p_first_name,
    p_last_name,p_phone,p_email,p_address,p_address2,p_city,p_gov,p_zip,p_landmark,
    p_notes,p_total,coalesce(p_created_at,now()))
  returning id into new_id;

  insert into public.order_items(order_id,product_id,name,color,size,price,qty)
  select new_id, e->>'id', e->>'name', e->>'color', e->>'size',
         (e->>'price')::int, (e->>'qty')::int
  from jsonb_array_elements(p_items) e;

  return p_num;
end; $$;

-- Social-proof count for a product page (anon-callable), bypasses RLS via definer.
create function public.orders_for_product(p_pid text) returns integer
  language sql security definer set search_path = public stable as $$
  select count(distinct o.id)::int from public.orders o
  join public.order_items i on i.order_id = o.id
  where o.status <> 'annulee' and i.product_id = p_pid;
$$;

-- Lock down default execute, then grant only what the storefront needs.
revoke execute on function public.create_order(text,text,text,text,text,text,text,
  text,text,text,text,text,text,text,integer,jsonb,timestamptz) from public;
revoke execute on function public.orders_for_product(text) from public;
grant execute on function public.create_order(text,text,text,text,text,text,text,
  text,text,text,text,text,text,text,integer,jsonb,timestamptz) to anon, authenticated;
grant execute on function public.orders_for_product(text) to anon, authenticated;
