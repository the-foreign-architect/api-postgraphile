begin;
create table architect (
  id serial primary key,
  name text not null check(length(name) > 0),
  website text check(website ~ '^https?://[^/]+') unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger _100_timestamps
  after insert or update on architect
  for each row
  execute procedure app_private.tg__update_timestamps();

comment on table architect is
  E'Basic infos about the architects/offices.';
comment on column architect.name is
  E'Architect/Office name.';
comment on column architect.website is
  E'Architect/Office website.';

grant select on architect to tfa_public;

-- COUNTRY
create table country (
  id serial primary key,
  name text not null check(length(name) > 0),
  iso char(2) not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger _100_timestamps
  after insert or update on country
  for each row
  execute procedure app_private.tg__update_timestamps();

grant select on country to tfa_public;

-- CITY
create table city (
  id serial primary key,
  name text not null check(length(name) > 0),
  country_id int not null references country on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger _100_timestamps
  after insert or update on city
  for each row
  execute procedure app_private.tg__update_timestamps();

grant select on city to tfa_public;

-- BUILDING
create table building (
  id serial primary key,
  name text not null check(length(name) > 0),
  website text check(website ~ '^https?://[^/]+') unique,
  address text,
  lat float,
  lng float,
  gmaps_link text,
  gmaps_embed text,
  visited BOOLEAN default false,
  date_visited TIMESTAMP,
  bucket_list boolean default false,
  city_id int references city,
  year smallint,
  height text,
  gfa text,
  typology text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger _100_timestamps
  after insert or update on building
  for each row
  execute procedure app_private.tg__update_timestamps();

comment on table building is
  E'Basic infos about the buildings.';
comment on column building.name is
  E'Building name.';
comment on column building.website is
  E'Building website.';

grant select on building to tfa_public;

-- ARCHITECT BUILDING
create table architect_building (
  id serial primary key,
  architect_id int not null references architect on delete cascade,
  building_id int not null references building on delete cascade
);

grant select on architect_building to tfa_public;

-- LINKS_SOURCES
create table link_source (
  id serial primary key,
  name text not null check(length(name) > 0),
  website text check(website ~ '^https?://[^/]+') unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger _100_timestamps
  after insert or update on link_source
  for each row
  execute procedure app_private.tg__update_timestamps();

grant select on link_source to tfa_public;

-- LINKS
create table link (
  id serial primary key,
  building_id int not null references building on delete cascade,
  url text check(url ~ '^https?://[^/]+') not null unique,
  title text,
  source_id int references link_source,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger _100_timestamps
  after insert or update on link
  for each row
  execute procedure app_private.tg__update_timestamps();

grant select on link to tfa_public;

commit;