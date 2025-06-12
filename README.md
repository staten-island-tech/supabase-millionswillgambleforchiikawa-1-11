[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=18893042)

meta - things that exist outside the route
router.befor each -- before you go to a route it checks authstore and user logged in

alert("message")

## Categories / Checklist on the Final

- Cards on the screen
- props utilized
- version specfic v1 and v2 (depending on version)
- correctly use props/components
- using unomounted
- calls to supabase
- ref 1/ref 2 used correctly (depending on version)

✅ Step 3: Supabase Tables
profiles

id: UUID (matches auth.users)

money: int

inventory

id: serial

user_id: UUID

gacha_id: int (matches gachaPool)

obtained_at: timestamp

You can create inventory like this in Supabase SQL editor:

sql
Copy
Edit
create table inventory (
id serial primary key,
user_id uuid references profiles(id),
gacha_id int,
obtained_at timestamp default now()
);

Step 1: Supabase Schema Assumptions
You should have:

profiles table with user coins.

inventory table:

sql
Copy
Edit
create table inventory (
id serial primary key,
user_id uuid references profiles(id),
gacha_id int,
obtained_at timestamp
).
