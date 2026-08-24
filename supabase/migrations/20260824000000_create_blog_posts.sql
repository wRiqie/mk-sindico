create extension if not exists unaccent with schema extensions;

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  excerpt text not null,
  content_html text not null,
  category text not null,
  category_slug text not null,
  cover_image_url text,
  cover_image_alt text,
  author text not null default 'Marcos Kowalewski',
  status text not null default 'draft',
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint blog_posts_slug_key unique (slug),
  constraint blog_posts_title_not_blank check (btrim(title) <> ''),
  constraint blog_posts_slug_format check (
    slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
  ),
  constraint blog_posts_excerpt_not_blank check (btrim(excerpt) <> ''),
  constraint blog_posts_content_html_not_blank check (btrim(content_html) <> ''),
  constraint blog_posts_category_not_blank check (btrim(category) <> ''),
  constraint blog_posts_category_slug_format check (
    category_slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
  ),
  constraint blog_posts_author_not_blank check (btrim(author) <> ''),
  constraint blog_posts_status_check check (
    status in ('draft', 'published', 'archived')
  ),
  constraint blog_posts_published_at_required check (
    status <> 'published' or published_at is not null
  )
);

comment on table public.blog_posts is
  'Artigos do blog publicados e atualizados pelo n8n.';
comment on column public.blog_posts.content_html is
  'Corpo sanitizado do artigo em HTML, sem a estrutura completa da pagina.';
comment on column public.blog_posts.category is
  'Nome da categoria exibido ao leitor.';
comment on column public.blog_posts.category_slug is
  'Identificador normalizado da categoria, gerado automaticamente.';

create or replace function public.blog_category_slug(category_name text)
returns text
language sql
stable
set search_path = ''
as $$
  select trim(
    both '-' from regexp_replace(
      lower(extensions.unaccent(btrim(category_name))),
      '[^a-z0-9]+',
      '-',
      'g'
    )
  );
$$;

create or replace function public.prepare_blog_post()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.title := btrim(new.title);
  new.slug := lower(btrim(new.slug));
  new.excerpt := btrim(new.excerpt);
  new.category := btrim(new.category);
  new.category_slug := public.blog_category_slug(new.category);
  new.author := btrim(new.author);
  new.updated_at := now();

  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;

  return new;
end;
$$;

create trigger prepare_blog_post_before_write
before insert or update on public.blog_posts
for each row execute function public.prepare_blog_post();

create index blog_posts_category_slug_idx
  on public.blog_posts (category_slug);

create index blog_posts_public_listing_idx
  on public.blog_posts (published_at desc)
  where status = 'published';

alter table public.blog_posts enable row level security;

create policy "Public can read published blog posts"
on public.blog_posts
for select
to anon, authenticated
using (
  status = 'published'
  and published_at <= now()
);

revoke insert, update, delete on table public.blog_posts from anon, authenticated;
grant select on table public.blog_posts to anon, authenticated;

revoke all on function public.blog_category_slug(text) from public;
grant execute on function public.blog_category_slug(text) to service_role;

revoke all on function public.prepare_blog_post() from public;
grant execute on function public.prepare_blog_post() to service_role;
