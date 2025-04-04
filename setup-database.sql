-- Verificar se a tabela existe
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
drop policy if exists "Permitir inserção anônima de presentes" on gifts;

-- Criar políticas de acesso mais permissivas
create policy "Permitir leitura anônima de presentes" on gifts
  for select
  to anon
  using (true);

create policy "Permitir atualização anônima de presentes" on gifts
  for update
  to anon
  using (true)
  with check (true);

create policy "Permitir inserção anônima de presentes" on gifts
  for insert
  to anon
  with check (true);

-- Verificar se existem registros
insert into gifts (name, image_url, price)
select 
  'Jogo de Panelas', 
  'https://example.com/panelas.jpg', 
  299.90
where not exists (select 1 from gifts limit 1);

-- Verificar políticas
select * from pg_policies where tablename = 'gifts'; 