-- Criar a tabela se ela não existir
create table if not exists gifts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  image_url text not null,
  price numeric not null,
  reserved_by text,
  paid boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS (Row Level Security)
alter table gifts enable row level security;

-- Remover políticas existentes para evitar duplicatas
drop policy if exists "Permitir leitura anônima de presentes" on gifts;
drop policy if exists "Permitir atualização anônima de presentes" on gifts;

-- Criar políticas de acesso
create policy "Permitir leitura anônima de presentes" on gifts
  for select
  to anon
  using (true);

create policy "Permitir atualização anônima de presentes" on gifts
  for update
  to anon
  using (true)
  with check (true);

-- Inserir alguns presentes de exemplo
insert into gifts (name, image_url, price)
values 
  ('Jogo de Panelas', 'https://example.com/panelas.jpg', 299.90),
  ('Liquidificador', 'https://example.com/liquidificador.jpg', 199.90),
  ('Jogo de Toalhas', 'https://example.com/toalhas.jpg', 149.90)
on conflict do nothing; 