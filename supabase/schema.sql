-- Cayman Data Intelligence Platform schema
-- Run in Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  role text not null check (role in ('admin', 'analyst', 'client')),
  created_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  industry text,
  contact_person text,
  contact_email text,
  phone text,
  subscription_plan text,
  status text not null default 'trial',
  stripe_customer_id text unique,
  stripe_subscription_id text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  company_name text,
  service_needed text not null,
  source text not null default 'website',
  message text,
  estimated_value numeric(12,2),
  lead_score integer not null default 0,
  status text not null default 'new' check (status in ('new','qualified','contacted','sold','closed_lost')),
  assigned_client_id uuid references public.clients(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.rental_data (
  id uuid primary key default gen_random_uuid(),
  report_date date not null,
  location text not null default 'Cayman Islands',
  vehicle_type text not null,
  provider_name text,
  listed_price_per_day numeric(12,2),
  booked_price_per_day numeric(12,2),
  booking_duration_days integer,
  available_units integer,
  booked_units integer,
  source text not null default 'manual',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  report_name text not null,
  report_month date not null,
  file_url text,
  price numeric(12,2) not null default 149.00,
  summary text,
  created_at timestamptz not null default now()
);

create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  event_type text not null,
  event_note text,
  actor text not null default 'system',
  created_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;
alter table public.clients enable row level security;
alter table public.leads enable row level security;
alter table public.rental_data enable row level security;
alter table public.reports enable row level security;
alter table public.lead_events enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.is_client()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role in ('client', 'admin')
  );
$$;

drop policy if exists "admins manage user_roles" on public.user_roles;
create policy "admins manage user_roles"
on public.user_roles
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admins manage clients" on public.clients;
create policy "admins manage clients"
on public.clients
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admins manage leads" on public.leads;
create policy "admins manage leads"
on public.leads
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admins manage rental_data" on public.rental_data;
create policy "admins manage rental_data"
on public.rental_data
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "clients view reports" on public.reports;
create policy "clients view reports"
on public.reports
for select
using (public.is_client());

drop policy if exists "admins manage reports" on public.reports;
create policy "admins manage reports"
on public.reports
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admins manage lead_events" on public.lead_events;
create policy "admins manage lead_events"
on public.lead_events
for all
using (public.is_admin())
with check (public.is_admin());

insert into public.reports (report_name, report_month, price, summary)
values
  ('Cayman Rental Intelligence - Starter', date_trunc('month', now())::date, 149.00, 'Starter market report template.')
on conflict do nothing;

-- Optional sample data
insert into public.clients (business_name, industry, contact_person, contact_email, subscription_plan, status)
values
  ('City Car Rental', 'Car Rental', 'Hilzan Goulbourne', 'admin@example.com', 'pro', 'active')
on conflict do nothing;

insert into public.leads (full_name, email, phone, service_needed, source, message, estimated_value, lead_score, status)
values
  ('Jane Ebanks', 'jane@example.com', '+1-345-555-1234', 'car-rental-leads', 'website', 'Need an SUV from airport for 5 days.', 125.00, 82, 'qualified'),
  ('Mark Rivers', 'mark@example.com', '+1-345-555-7777', 'market-intelligence', 'whatsapp', 'Looking for monthly pricing trends.', 300.00, 71, 'new')
on conflict do nothing;
