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

  // Load user data on app start
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const userData = await supabaseStorage.getUserData();
        if (userData.preferences && userData.preferences.goal && userData.preferences.bodyParts.length > 0) {
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
  }, [user]);

  const handleProgramGenerated = async (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    setShowProgram(true);
    
    // Save preferences to storage
    await supabaseStorage.saveUserPreferences(preferences);
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

  // Show sign in page if not authenticated
  if (!user && import.meta.env.VITE_SUPABASE_URL) {
    return <SignInPage />;
  }

  // If no Supabase config, show demo mode
  if (!import.meta.env.VITE_SUPABASE_URL && !showProgram) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-secondary-light to-secondary-dark font-body">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-heading text-yellow-800 mb-2">Demo Mode</h2>
            <p className="text-yellow-700 font-body">
              This is a demo version. To use full features including user accounts and data persistence, 
              please set up Supabase by clicking the settings icon above.
            </p>
          </div>
        </div>
        <ProgramBuilder onProgramGenerated={handleProgramGenerated} />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary-light to-secondary-dark font-body">
      <Header />
      
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