# Supabase Setup Guide

This app requires Supabase for authentication and data storage. Follow these steps to set up your Supabase project.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `momentum-fitness-app` (or your preferred name)
   - Database Password: Choose a strong password
   - Region: Choose the closest region to your users
6. Click "Create new project"

## 2. Get Your Project Credentials

1. Once your project is created, go to Settings > API
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 3. Set Up Environment Variables

1. Create a `.env` file in your project root
2. Add the following variables:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from step 2.

## 4. Set Up Database Tables

Run the following SQL commands in your Supabase SQL Editor (Dashboard > SQL Editor):

```sql
-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  age INTEGER,
  gender TEXT,
  fitness_goals TEXT[],
  preferred_workout_styles JSONB,
  target_muscle_groups TEXT[],
  skill_level TEXT,
  preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorite_exercises table
CREATE TABLE favorite_exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workout_sessions table
CREATE TABLE workout_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  program_id TEXT,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  exercises JSONB,
  total_duration INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own favorites" ON favorite_exercises
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites" ON favorite_exercises
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own workout sessions" ON workout_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own workout sessions" ON workout_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for user_profiles
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## 5. Configure Authentication

1. Go to Authentication > Settings in your Supabase dashboard
2. Configure the following:
   - **Site URL**: `http://localhost:5173` (for development)
   - **Redirect URLs**: Add `http://localhost:5173/**` for development
3. Enable email authentication (should be enabled by default)

## 6. Test Your Setup

1. Start your development server: `npm run dev`
2. Open your browser to `http://localhost:5173`
3. Try signing up with a new account
4. Check your Supabase dashboard to see if the user was created

## 7. Production Setup

For production deployment:

1. Update your Site URL and Redirect URLs in Supabase to your production domain
2. Set up your environment variables in your hosting platform
3. Consider setting up email templates in Supabase for better user experience

## Troubleshooting

### Common Issues:

1. **"Supabase not configured" error**: Make sure your `.env` file exists and has the correct variable names
2. **Authentication not working**: Check that your Site URL and Redirect URLs are correctly configured
3. **Database errors**: Ensure you've run all the SQL commands from step 4
4. **RLS errors**: Make sure Row Level Security policies are properly set up

### Getting Help:

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)
