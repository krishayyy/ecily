-- Ecily Research — saved searches table.
-- Run this once in the Supabase project's SQL editor.

create table if not exists public.research_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question text not null,
  answer text not null,
  sources jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists research_searches_user_id_idx
  on public.research_searches (user_id, created_at desc);

alter table public.research_searches enable row level security;

create policy "Users manage their own searches"
  on public.research_searches
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
