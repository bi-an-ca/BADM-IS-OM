import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Create a mock client if environment variables are not set
const isConfigured = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Disable session persistence for mock
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
})

// Auth helper functions
export const auth = {
  // Sign up with email and password
  signUp: async (email: string, password: string) => {
    if (!isConfigured) {
      return { 
        data: { user: { id: 'demo-user', email, user_metadata: { full_name: email.split('@')[0] } } }, 
        error: null 
      }
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    if (!isConfigured) {
      return { 
        data: { user: { id: 'demo-user', email, user_metadata: { full_name: email.split('@')[0] } } }, 
        error: null 
      }
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    if (!isConfigured) {
      return { error: null }
    }
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: () => {
    if (!isConfigured) {
      return Promise.resolve({ data: { user: null }, error: null })
    }
    return supabase.auth.getUser()
  },

  // Listen to auth changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    if (!isConfigured) {
      // Return a mock subscription that does nothing
      return { data: { subscription: { unsubscribe: () => {} } } }
    }
    return supabase.auth.onAuthStateChange(callback)
  }
}