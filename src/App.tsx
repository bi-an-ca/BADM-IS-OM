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
        if (!hasSupabase) {
          // In demo mode, check for local profile or show onboarding
          const localProfile = localStorage.getItem('userProfile');
          if (localProfile) {
            setUserProfile(JSON.parse(localProfile));
          } else {
            setShowOnboarding(true);
          }
          setIsLoading(false);
          return;
        }

        if (!user) {
          setIsLoading(false);
          return;
        }

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
    const fullProfile: UserProfile = {
      id: user?.id || 'demo-user',
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

    // Save profile
    if (hasSupabase) {
      try {
        await supabaseStorage.saveUserProfile(fullProfile);
      } catch (error) {
        console.error('Error saving profile:', error);
      }
    } else {
      // Save to localStorage in demo mode
      localStorage.setItem('userProfile', JSON.stringify(fullProfile));
    }
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
  };

  const handleProfileUpdate = async (profile: Partial<UserProfile>) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, ...profile, updatedAt: new Date() };
      setUserProfile(updatedProfile);
      
      if (hasSupabase) {
        try {
          await supabaseStorage.saveUserProfile(updatedProfile);
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      } else {
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
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

  // Show onboarding if needed
  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} onSkip={handleOnboardingSkip} />;
  }

  // Show sign in page if Supabase is configured but user is not authenticated
  if (hasSupabase && !user) {
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