import React, { useState, useEffect } from 'react';
import { ProgramBuilder } from './components/ProgramBuilder';
import { WorkoutProgram } from './components/WorkoutProgram';
import { Header } from './components/Header';
import { SignInPage } from './components/SignInPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Dashboard } from './components/Dashboard';
import { useAuth } from './hooks/useAuth';
import { supabaseStorage } from './utils/supabaseStorage';
import type { UserProfile } from './types/user';

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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProgram, setShowProgram] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if Supabase is configured
  const hasSupabase = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

  // Load user data on app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // If no Supabase configuration, show error
        if (!hasSupabase) {
          console.error('Supabase not configured. Please set up VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
          setIsLoading(false);
          return;
        }

        // If no user, wait for authentication
        if (!user) {
          setIsLoading(false);
          return;
        }

        // Load user data from Supabase
        const userData = await supabaseStorage.getUserData();
        if (userData.profile) {
          setUserProfile(userData.profile);
        } else {
          // Show onboarding for new users
          setShowOnboarding(true);
        }
        
        if (userData.preferences && userData.preferences.goal && userData.preferences.bodyParts && userData.preferences.bodyParts.length > 0) {
          setUserPreferences(userData.preferences);
          setShowProgram(true);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Show onboarding on error
        setShowOnboarding(true);
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

  const handleOnboardingComplete = async (profile: Partial<UserProfile>) => {
    if (!user) {
      console.error('No authenticated user found');
      return;
    }

    const fullProfile: UserProfile = {
      id: user.id,
      fullName: profile.fullName || 'User',
      age: profile.age || 25,
      gender: profile.gender || 'prefer-not-to-say',
      fitnessGoals: profile.fitnessGoals || [],
      preferredWorkoutStyles: profile.preferredWorkoutStyles || [],
      targetMuscleGroups: profile.targetMuscleGroups || [],
      skillLevel: profile.skillLevel || 'beginner',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setUserProfile(fullProfile);
    setShowOnboarding(false);

    // Save profile to Supabase
    try {
      await supabaseStorage.saveUserProfile(fullProfile);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
  };

  const handleProfileUpdate = async (profile: Partial<UserProfile>) => {
    if (userProfile && user) {
      const updatedProfile = { ...userProfile, ...profile, updatedAt: new Date() };
      setUserProfile(updatedProfile);
      
      try {
        await supabaseStorage.saveUserProfile(updatedProfile);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
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

  // Show error if Supabase is not configured
  if (!hasSupabase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-secondary-light to-secondary-dark font-body flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h2 className="text-2xl font-heading text-red-800 mb-4">Configuration Required</h2>
            <p className="text-red-700 font-body mb-4">
              Please set up your Supabase environment variables to use this app.
            </p>
            <div className="text-left bg-red-100 p-4 rounded-lg mb-4">
              <p className="text-sm font-mono text-red-800">
                Create a .env file with:<br/>
                VITE_SUPABASE_URL=your_supabase_url<br/>
                VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
              </p>
            </div>
            <p className="text-sm text-red-600 font-body">
              Visit <a href="https://supabase.com" className="underline">supabase.com</a> to create a project.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show onboarding if needed
  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} onSkip={handleOnboardingSkip} />;
  }

  // Show sign in page if user is not authenticated
  if (!user) {
    return <SignInPage />;
  }

  // Show new dashboard for MVP features
  return (
    <Dashboard
      user={user}
      hasSupabase={hasSupabase}
      userProfile={userProfile}
      onProfileUpdate={handleProfileUpdate}
    />
  );
}

export default App;