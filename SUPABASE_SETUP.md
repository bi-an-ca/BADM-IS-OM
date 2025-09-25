# Supabase Authentication Setup

This guide will help you set up Supabase authentication to fix the URL callback issue.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization and enter project details
5. Wait for the project to be created

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## 3. Configure Environment Variables

1. Create a `.env` file in your project root (copy from `env.example`)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Configure Authentication Settings

1. In your Supabase dashboard, go to **Authentication** → **URL Configuration**
2. Add these URLs to **Site URL**:
   - `http://localhost:3000` (for development)
   - `https://your-domain.com` (for production)

3. Add these URLs to **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback`

## 5. Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email templates if needed

## 6. Test the Setup

1. Start your development server: `npm run dev`
2. Click "Sign In" in the header
3. Enter your email address
4. Check your email for the sign-in link
5. Click the link - it should redirect properly to your app

## Troubleshooting

### URL Still Shows Tokens
- Make sure your redirect URLs are configured correctly in Supabase
- Check that your `.env` file has the correct values
- Restart your development server after adding environment variables

### Authentication Not Working
- Verify your Supabase project is active
- Check the browser console for error messages
- Ensure your API keys are correct

### Email Not Received
- Check your spam folder
- Verify your email address is correct
- Check Supabase logs in the dashboard

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables in production
- Regularly rotate your API keys
- Monitor your Supabase usage and limits
