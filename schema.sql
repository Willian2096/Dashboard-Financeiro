-- Habilitar extensões necessárias
create extension if not exists "uuid-ossp";

-- Tabela de transações
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  description text not null,
  amount decimal(10,2) not null,
  type text not null check (type in ('income', 'expense')),
  category text not null,
  date date not null default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de configurações do usuário
create table public.settings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  currency text default 'BRL' not null,
  monthly_budget decimal(10,2),
  categories jsonb default '["Alimentação","Transporte","Moradia","Saúde","Lazer","Educação","Outros"]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Índices para melhor performance
create index transactions_user_id_idx on public.transactions(user_id);
create index transactions_date_idx on public.transactions(date);
create index transactions_type_idx on public.transactions(type);
create index settings_user_id_idx on public.settings(user_id);

-- Habilitar Row Level Security (RLS)
alter table public.transactions enable row level security;
alter table public.settings enable row level security;

-- Políticas RLS para transactions
create policy "Usuários podem ver apenas suas transações"
  on public.transactions
  for select
  using (auth.uid() = user_id);

create policy "Usuários podem inserir suas próprias transações"
  on public.transactions
  for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem atualizar suas próprias transações"
  on public.transactions
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Usuários podem deletar suas próprias transações"
  on public.transactions
  for delete
  using (auth.uid() = user_id);

-- Políticas RLS para settings
create policy "Usuários podem ver apenas suas configurações"
  on public.settings
  for select
  using (auth.uid() = user_id);

create policy "Usuários podem inserir suas próprias configurações"
  on public.settings
  for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem atualizar suas próprias configurações"
  on public.settings
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Usuários podem deletar suas próprias configurações"
  on public.settings
  for delete
  using (auth.uid() = user_id);

-- Função para atualizar updated_at automaticamente
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers para atualizar updated_at
create trigger handle_transactions_updated_at
  before update on public.transactions
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_settings_updated_at
  before update on public.settings
  for each row
  execute procedure public.handle_updated_at();
