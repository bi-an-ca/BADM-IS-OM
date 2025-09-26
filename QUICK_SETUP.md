# Quick Setup Guide

## Current Status: Demo Mode ✅

Your app is currently running in **demo mode**, which means:
- ✅ The landing page works
- ✅ You can sign in/out with any email/password
- ✅ All features work for testing
- ⚠️ Data is not persisted (resets on page refresh)

## To Enable Full Authentication:

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/login and create a new project
3. Wait for project to be ready (2-3 minutes)

### Step 2: Get Your Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** (looks like `https://abcdefgh.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

### Step 3: Create Environment File
Create a `.env` file in your project root with:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Restart Development Server
```bash
npm run dev
```

## Testing the App

### Demo Mode (Current)
- Use any email/password to sign in
- All features work but data doesn't persist
- Perfect for testing the UI and functionality

### Full Mode (After Supabase Setup)
- Real authentication with email verification
- Data persists between sessions
- Full user management

## Troubleshooting

### App Won't Load
- Check browser console for errors
- Make sure you're running `npm run dev`
- Try refreshing the page

### Authentication Not Working
- Verify your `.env` file has correct credentials
- Restart the development server after adding `.env`
- Check Supabase project is active

### Still Having Issues?
1. Clear browser cache and cookies
2. Check the browser console for error messages
3. Make sure all files are saved
4. Restart your development server

## Current Features Working:
- ✅ Landing page with login/logout
- ✅ User authentication (demo mode)
- ✅ Workout program builder
- ✅ Exercise database with 24+ exercises
- ✅ Workout timer with rest periods
- ✅ Favorites system
- ✅ Progress tracking
- ✅ Mobile responsive design
- ✅ PWA support
