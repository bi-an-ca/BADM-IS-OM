import React, { useState, useEffect } from 'react';
import { ProgramBuilder } from './components/ProgramBuilder';
import { WorkoutProgram } from './components/WorkoutProgram';
import { Header } from './components/Header';
import { AuthCallback } from './components/AuthCallback';
import { storage } from './utils/storage';
import { supabase, handleAuthStateChange } from './lib/supabase';

export interface UserPreferences {
  goal: string;
  skillLevel: string;
  bodyParts: string[];
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  instructions: string[];
}

function App() {
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [showProgram, setShowProgram] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAuthCallback, setIsAuthCallback] = useState(false);

  // Check if this is an auth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    
    // Check if we have auth tokens in URL
    if (hash.includes('access_token') || urlParams.has('access_token')) {
      setIsAuthCallback(true);
    }
  }, []);

  // Load user data on app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
        }

        const userData = storage.getUserData();
        if (userData.preferences) {
          setUserPreferences(userData.preferences);
          setShowProgram(true);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();

    // Listen for auth state changes
    const { data: { subscription } } = handleAuthStateChange((user) => {
      setUser(user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleProgramGenerated = (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    setShowProgram(true);
    
    // Save preferences to storage
    const userData = storage.getUserData();
    userData.preferences = preferences;
    storage.saveUserData(userData);
  };

  const handleBackToBuilder = () => {
    setShowProgram(false);
    setUserPreferences(null);
  };

  const handleAuthComplete = (user: any) => {
    setUser(user);
    setIsAuthCallback(false);
    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  // Auth callback component
  if (isAuthCallback) {
    return <AuthCallback onAuthComplete={handleAuthComplete} />;
  }

  // Loading component
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-secondary-light to-secondary-dark font-body flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-accent font-body">Loading your fitness journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary-light to-secondary-dark font-body">
      <Header user={user} onUserChange={setUser} />
      
      {!showProgram ? (
        <ProgramBuilder onProgramGenerated={handleProgramGenerated} />
      ) : (
        <WorkoutProgram 
          preferences={userPreferences!} 
          onBack={handleBackToBuilder}
        />
      )}
    </div>
  );
}

export default App;