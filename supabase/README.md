# Supabase setup

## 1) Create project
Create a Supabase project and copy:
- Project URL
- anon key
- service role key

## 2) Run schema
Open SQL Editor and run `schema.sql`.

## 3) Create first admin user
Create a user in Authentication.
Then insert a matching role row in SQL, replacing the user UUID:

```sql
insert into public.user_roles (user_id, role)
values ('YOUR_AUTH_USER_UUID', 'admin');
```

## 4) Optional storage bucket
Create a storage bucket called `reports` if you want to upload monthly PDF reports.

## 5) Recommended hardening
- Add database backups
- Restrict service role key to server-only usage
- Add CAPTCHA to public lead forms
