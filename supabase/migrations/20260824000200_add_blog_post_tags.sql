alter table public.blog_posts
add column tags text[] not null default '{}';

comment on column public.blog_posts.tags is
  'Palavras-chave editoriais enviadas pelo n8n.';

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
  new.tags := array(
    select distinct btrim(tag)
    from unnest(new.tags) as tag
    where btrim(tag) <> ''
  );
  new.updated_at := now();

  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;

  return new;
end;
$$;

create index blog_posts_tags_idx
  on public.blog_posts using gin (tags);

