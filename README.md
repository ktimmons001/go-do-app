# Go Do App

A personal task management app built with React + Supabase.

## Setup

### 1. Supabase (free database)
1. Sign up at https://supabase.com
2. New Project > name: go-do-app > pick password > nearest region
3. SQL Editor > paste and run:

```sql
create table kv_store (key text primary key, value text not null, updated_at timestamptz default now());
alter table kv_store enable row level security;
create policy "Allow all" on kv_store for all using (true) with check (true);
```

4. Settings > API > copy Project URL and anon public key

### 2. Vercel (free hosting)
1. Go to https://vercel.com/new > sign in with GitHub
2. Import this repo
3. Add Environment Variables:
   - VITE_SUPABASE_URL = your Supabase URL
   - VITE_SUPABASE_ANON_KEY = your anon key
4. Deploy

### 3. Phone
- iPhone: Safari > Share > Add to Home Screen
- Android: Chrome > Menu > Add to Home Screen

## Updating
1. Edit src/App.jsx in this repo
2. Commit changes
3. Vercel auto-deploys in 30 seconds
