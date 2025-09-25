import React, { useEffect, useState } from 'react';
import { supabase, handleAuthCallback } from '../lib/supabase';
import { storage } from '../utils/storage';

interface AuthCallbackProps {
  onAuthComplete: (user: any) => void;
}

export function AuthCallback({ onAuthComplete }: AuthCallbackProps) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const processAuth = async () => {
      try {
        // Handle the auth callback
        const user = await handleAuthCallback();
        
        if (user) {
          // Save user data to local storage
          const userData = storage.getUserData();
          userData.user = {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.email?.split('@')[0],
            avatar: user.user_metadata?.avatar_url
          };
          storage.saveUserData(userData);
          
          setStatus('success');
          setMessage('Authentication successful! Redirecting...');
          
          // Redirect after a short delay
          setTimeout(() => {
            onAuthComplete(user);
          }, 1500);
        } else {
          setStatus('error');
          setMessage('Authentication failed. Please try again.');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage('An error occurred during authentication.');
      }
    };

    processAuth();
  }, [onAuthComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary-light to-secondary-dark font-body flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-8 shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-heading text-accent mb-2">Authenticating...</h2>
              <p className="text-accent/70 font-body">{message}</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-heading text-accent mb-2">Welcome!</h2>
              <p className="text-accent/70 font-body">{message}</p>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-heading text-accent mb-2">Authentication Failed</h2>
              <p className="text-accent/70 font-body mb-4">{message}</p>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
              >
                Return to App
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
