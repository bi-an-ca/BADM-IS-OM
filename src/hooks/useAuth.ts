import { useState, useEffect } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true
  })

  // Check if Supabase is configured
  const hasSupabase = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

  useEffect(() => {
    // Require Supabase configuration
    if (!hasSupabase) {
      console.error('Supabase not configured. Please set up VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
      setAuthState({
        user: null,
        session: null,
        loading: false
      })
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false
      })
    })

    // Listen for auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false
      })

      // Create user profile on sign up
      if (event === 'SIGNED_UP' && session?.user) {
        await createUserProfile(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [hasSupabase])

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const createUserProfile = async (user: User) => {
    const { error } = await supabase
      .from('user_profiles')
      .insert({
        id: user.id,
        full_name: user.user_metadata.full_name || 'User',
        preferences: null
      })
    
    if (error) {
      console.error('Error creating user profile:', error)
    }
  }

  return {
    ...authState,
    signUp,
    signIn,
    signOut
  }
}