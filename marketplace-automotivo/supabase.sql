-- Rode este arquivo inteiro no Supabase: SQL Editor > New query > Run
create table if not exists veiculos (
  id bigint generated always as identity primary key,
  marca text not null, modelo text not null, categoria text,
  ano int, km int, preco numeric, cambio text, combustivel text, cor text,
  cidade text, unidade text, whatsapp text, descricao text, vendedor text,
  fotos text[] default '{}',
  status text default 'ativo',          -- ativo | pausado | vendido
  destaque boolean default false,
  criado_em timestamptz default now()
);
alter table veiculos enable row level security;
-- Visitantes: só enxergam anúncios ativos
create policy "leitura publica" on veiculos for select using (status = 'ativo');
-- Dono logado: lê tudo, cria, edita e exclui
create policy "dono total" on veiculos for all to authenticated using (true) with check (true);
-- Fotos: pasta pública; só o dono envia/apaga
insert into storage.buckets (id, name, public) values ('fotos', 'fotos', true) on conflict do nothing;
create policy "fotos upload dono" on storage.objects for insert to authenticated with check (bucket_id = 'fotos');
create policy "fotos apagar dono" on storage.objects for delete to authenticated using (bucket_id = 'fotos');
