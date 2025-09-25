import React, { useState } from 'react';
import { User, LogOut, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthButtonProps {
  user: any;
  onUserChange: (user: any) => void;
}

export function AuthButton({ user, onUserChange }: AuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: 'your-email@example.com', // This should be from a form
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        console.error('Error signing in:', error);
        alert('Error signing in. Please try again.');
      } else {
        alert('Check your email for the sign-in link!');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      } else {
        onUserChange(null);
        // Clear local storage
        localStorage.removeItem('momentum-fitness-data');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-body text-accent hidden sm:block">
            {user.user_metadata?.full_name || user.email?.split('@')[0]}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className="flex items-center space-x-1 px-3 py-2 text-accent/70 hover:text-accent transition-colors disabled:opacity-50"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-body hidden sm:block">Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
    >
      <Mail className="h-4 w-4" />
      <span className="font-body">
        {isLoading ? 'Signing in...' : 'Sign In'}
      </span>
    </button>
  );
}
