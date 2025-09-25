import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Configure redirect URLs
    redirectTo: `${window.location.origin}/auth/callback`
  }
});

// Handle auth state changes
export const handleAuthStateChange = (callback: (user: any) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      callback(session.user);
    } else if (event === 'SIGNED_OUT') {
      callback(null);
    }
  });
};

// Handle auth callback from URL
export const handleAuthCallback = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting session:', error);
      return null;
    }
    return data.session?.user || null;
  } catch (error) {
    console.error('Error handling auth callback:', error);
    return null;
  }
};
