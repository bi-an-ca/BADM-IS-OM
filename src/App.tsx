import React, { useState, useEffect } from 'react';
import { AuthModal } from './components/AuthModal';
import { ProgramBuilder } from './components/ProgramBuilder';
import { WorkoutProgram } from './components/WorkoutProgram';
import { Header } from './components/Header';
import { useAuth } from './hooks/useAuth';
import { storage } from './utils/storage';

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
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [showProgram, setShowProgram] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data on app start
  useEffect(() => {
    const loadUserData = () => {
      try {
        if (isAuthenticated) {
          const userData = storage.getUserData();
          if (userData.preferences) {
            setUserPreferences(userData.preferences);
            setShowProgram(true);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(authLoading);
      }
    };

    loadUserData();
  }, [isAuthenticated, authLoading]);

  const handleProgramGenerated = (preferences: UserPreferences) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
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

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  // Loading component
  if (isLoading || authLoading) {
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
      <Header 
        user={user}
        onSignInClick={() => setShowAuthModal(true)}
      />
      
      {!isAuthenticated ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-12 shadow-lg">
            <h1 className="text-4xl font-heading text-accent mb-4">
              Custom Workouts. Smart Feedback. Real Progress.
            </h1>
            <p className="text-xl text-accent/70 font-body mb-8">
              Your AI-powered virtual coach for safe and confident training
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-8 py-4 bg-primary text-white font-heading rounded-2xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      ) : !showProgram ? (
        <ProgramBuilder onProgramGenerated={handleProgramGenerated} />
      ) : (
        <WorkoutProgram 
          preferences={userPreferences!} 
          onBack={handleBackToBuilder}
        />
      )}
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;