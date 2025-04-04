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