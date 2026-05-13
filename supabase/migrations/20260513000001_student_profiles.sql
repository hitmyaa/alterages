-- ============================================================================
-- Migration : profils étudiants + disponibilités + zones d'intervention
-- ============================================================================
-- Tables créées :
--   - public.student_profiles : 1-to-1 avec auth.users (FK id)
--   - public.student_availabilities : créneaux disponibles (1-to-many)
--   - public.student_zones : zones d'intervention sélectionnées (1-to-many)
--
-- Politiques RLS : chaque utilisateur lit/écrit uniquement ses propres lignes.
-- Trigger : crée automatiquement un profil vide au signup d'un user.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- TABLE : student_profiles
-- ---------------------------------------------------------------------------
create table if not exists public.student_profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  prenom          text,
  nom             text,
  date_naissance  date,
  telephone       text,
  formation       text,
  etablissement   text,
  annee           text,
  transport_mode  text,
  -- Si vrai, l'utilisateur a explicitement coché "je remplirai mes
  -- disponibilités plus tard" pendant le questionnaire.
  availability_later  boolean not null default false,
  -- Vrai après soumission du questionnaire (cohérent avec
  -- auth.users.raw_user_meta_data->>'onboarded').
  onboarded       boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.student_profiles is 'Profil étudiant — 1-to-1 avec auth.users.';

-- Auto-update du `updated_at` à chaque UPDATE.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_student_profiles_updated_at on public.student_profiles;
create trigger trg_student_profiles_updated_at
  before update on public.student_profiles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- TABLE : student_availabilities
-- ---------------------------------------------------------------------------
-- Une ligne = un créneau de 2h coché par l'étudiant.
-- day_idx : 0=Lun, 6=Dim. slot_idx : 0=6h-8h, ..., 6=18h-20h.
create table if not exists public.student_availabilities (
  profile_id  uuid not null references public.student_profiles(id) on delete cascade,
  day_idx     smallint not null check (day_idx between 0 and 6),
  slot_idx    smallint not null check (slot_idx between 0 and 6),
  primary key (profile_id, day_idx, slot_idx)
);

comment on table public.student_availabilities is
  'Créneaux de disponibilité (jour 0-6 × créneau 0-6, 2h chacun, 6h-20h).';

-- ---------------------------------------------------------------------------
-- TABLE : student_zones
-- ---------------------------------------------------------------------------
-- Une ligne = une zone d'intervention sélectionnée.
-- zone_id : identifiant texte (cf. liste front : lyon-1, villeurbanne, ...).
create table if not exists public.student_zones (
  profile_id  uuid not null references public.student_profiles(id) on delete cascade,
  zone_id     text not null,
  primary key (profile_id, zone_id)
);

comment on table public.student_zones is
  'Zones d''intervention souhaitées (arrondissements Lyon + communes).';

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------
alter table public.student_profiles      enable row level security;
alter table public.student_availabilities enable row level security;
alter table public.student_zones         enable row level security;

-- student_profiles : self only
drop policy if exists "self read profile"   on public.student_profiles;
drop policy if exists "self insert profile" on public.student_profiles;
drop policy if exists "self update profile" on public.student_profiles;

create policy "self read profile"
  on public.student_profiles for select
  using (auth.uid() = id);

create policy "self insert profile"
  on public.student_profiles for insert
  with check (auth.uid() = id);

create policy "self update profile"
  on public.student_profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- student_availabilities : self only
drop policy if exists "self read availabilities"   on public.student_availabilities;
drop policy if exists "self insert availabilities" on public.student_availabilities;
drop policy if exists "self delete availabilities" on public.student_availabilities;

create policy "self read availabilities"
  on public.student_availabilities for select
  using (auth.uid() = profile_id);

create policy "self insert availabilities"
  on public.student_availabilities for insert
  with check (auth.uid() = profile_id);

create policy "self delete availabilities"
  on public.student_availabilities for delete
  using (auth.uid() = profile_id);

-- student_zones : self only
drop policy if exists "self read zones"   on public.student_zones;
drop policy if exists "self insert zones" on public.student_zones;
drop policy if exists "self delete zones" on public.student_zones;

create policy "self read zones"
  on public.student_zones for select
  using (auth.uid() = profile_id);

create policy "self insert zones"
  on public.student_zones for insert
  with check (auth.uid() = profile_id);

create policy "self delete zones"
  on public.student_zones for delete
  using (auth.uid() = profile_id);

-- ---------------------------------------------------------------------------
-- TRIGGER : auto-création d'un profil vide au signup
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.student_profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
