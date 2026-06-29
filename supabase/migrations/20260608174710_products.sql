-- Product catalogue. Scalar fields are columns; the nested/array fields
-- (photos, colors, sizes, specs, features, tags) are JSONB so the row maps 1:1
-- to the app's Product type. Public read; only admins may write.

create table public.products (
  id             text primary key,            -- slug, e.g. 'atlas'
  position       integer not null default 0,  -- display order
  name           text not null,
  sub            text not null default '',
  photo          integer,                     -- Pexels photo id
  photos         jsonb not null default '[]'::jsonb,
  rating         real not null default 0,     -- real, not numeric: returns a JSON number
  reviews        integer not null default 0,
  stock          integer not null default 0,
  category       text not null check (category in ('gaming','programmation','assis-debout')),
  category_label text not null default '',
  price          integer not null,            -- whole DT
  old_price      integer,
  badge          text,
  blurb          text not null default '',
  description    text not null default '',
  colors         jsonb not null default '[]'::jsonb,  -- [{name,hex}]
  sizes          jsonb not null default '[]'::jsonb,  -- string[]
  specs          jsonb not null default '[]'::jsonb,  -- [[label,value]]
  features       jsonb not null default '[]'::jsonb,  -- [[title,body]]
  tags           jsonb not null default '[]'::jsonb,  -- string[]
  created_at     timestamptz not null default now()
);

alter table public.products enable row level security;

-- Catalogue is public.
create policy "anyone reads products" on public.products
  for select using (true);

-- Writes are admin-only (for future product management in /admin).
create policy "admin inserts products" on public.products
  for insert to authenticated with check (public.is_admin());
create policy "admin updates products" on public.products
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin deletes products" on public.products
  for delete to authenticated using (public.is_admin());
