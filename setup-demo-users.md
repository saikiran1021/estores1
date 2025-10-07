# Setup Demo Users for eStores WorkHub

The database is ready but needs demo user accounts. Here are the accounts that need to be created:

## Demo User Accounts

### 1. Employee Account
- **Email**: employee@estores.com
- **Password**: password123
- **Role**: employee

### 2. Admin Account
- **Email**: admin@estores.com
- **Password**: admin123
- **Role**: admin

### 3. SuperAdmin Account
- **Email**: superadmin@estores.com
- **Password**: super123
- **Role**: admin

## How to Create Demo Users

### Option 1: Use the Signup Form
1. Go to the application and click "Sign up here"
2. Fill in the form for each user with their details
3. After signup, manually update the role in the database if needed

### Option 2: Manual Creation via Supabase Dashboard
1. Go to your Supabase Dashboard
2. Navigate to Authentication > Users
3. Click "Add User" and create each demo account
4. Set the email confirmation to confirmed
5. Then add the corresponding profile records

### Option 3: SQL Script (Recommended)
Run this script in your Supabase SQL Editor to create all demo users at once:

```sql
-- Note: You'll need to use Supabase's Admin API or Dashboard to create auth.users
-- This can be done through the Supabase Dashboard under Authentication > Users

-- After creating users in the auth system, insert their profiles:
-- Replace the UUIDs below with the actual user IDs from auth.users

-- Example profile inserts (replace UUIDs):
INSERT INTO profiles (id, email, name, surname, phone, role) VALUES
('USER_ID_1', 'employee@estores.com', 'John', 'Employee', '+1234567890', 'employee'),
('USER_ID_2', 'admin@estores.com', 'Jane', 'Admin', '+1234567891', 'admin'),
('USER_ID_3', 'superadmin@estores.com', 'Super', 'Admin', '+1234567892', 'admin');
```

## Current Workaround

For now, you can use the **Signup form** to create a new account, which will work immediately!
