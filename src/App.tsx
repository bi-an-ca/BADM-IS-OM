import React, { useState, useEffect } from 'react';
import { ProgramBuilder } from './components/ProgramBuilder';
import { WorkoutProgram } from './components/WorkoutProgram';
import { Header } from './components/Header';
import { SignInPage } from './components/SignInPage';
import { useAuth } from './hooks/useAuth';
import { supabaseStorage } from './utils/supabaseStorage';

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
  const { user, loading: authLoading } = useAuth();
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [showProgram, setShowProgram] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if Supabase is configured
  const hasSupabase = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

  // Load user data on app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        if (!hasSupabase) {
          // In demo mode, just finish loading
          setIsLoading(false);
          return;
        }

        if (!user) {
          setIsLoading(false);
          return;
        }

        const userData = await supabaseStorage.getUserData();
        if (userData.preferences && userData.preferences.goal && userData.preferences.bodyParts && userData.preferences.bodyParts.length > 0) {
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
  }, [user, hasSupabase]);

  const handleProgramGenerated = async (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    setShowProgram(true);
    
    // Save preferences to storage only if Supabase is available
    if (hasSupabase) {
      try {
        await supabaseStorage.saveUserPreferences(preferences);
      } catch (error) {
        console.error('Error saving preferences:', error);
      }
    }
  };

  const handleBackToBuilder = () => {
    setShowProgram(false);
    setUserPreferences(null);
  };

  // Loading component
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-secondary-light to-secondary-dark font-body flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-accent font-body">Loading...</p>
        </div>
      </div>
    );
  }

  // Show sign in page if Supabase is configured but user is not authenticated
  if (hasSupabase && !user) {
    return <SignInPage />;
  }

  // Main app content
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary-light to-secondary-dark font-body">
      <Header />
      
      {/* Demo mode banner */}
      {!hasSupabase && (
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
            <h2 className="text-lg font-heading text-yellow-800 mb-2">Demo Mode</h2>
            <p className="text-yellow-700 font-body text-sm">
              This is a demo version. To use full features including user accounts and data persistence, 
              please set up Supabase by clicking the settings icon above.
            </p>
          </div>
        </div>
      )}
      
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