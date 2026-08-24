grant select, insert, update, delete
on table public.blog_posts
to service_role;

grant usage
on schema public
to service_role;

