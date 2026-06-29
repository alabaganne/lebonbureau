-- Sample data applied on every `supabase db reset`, so the admin dashboard has
-- something to look at. One order for the "atlas" desk (see lib/data.ts).

with o as (
  insert into public.orders
    (num, status, payment, first_name, last_name, phone, email,
     address, address2, city, gov, zip, landmark, notes, total)
  values
    ('#LBB-10042', 'nouvelle', 'cod', 'Yassine', 'Trabelsi', '20123456',
     'yassine@exemple.tn', '12 Avenue Habib Bourguiba', '', 'La Marsa', 'Tunis',
     '2078', 'Face à la pharmacie', 'Commande de démonstration', 1529)
  returning id
)
insert into public.order_items (order_id, product_id, name, color, size, price, qty)
select o.id, 'atlas', 'Atlas', 'Noir mat', '140 × 80 cm', 1529, 1 from o;
