import React, { useState, useEffect } from 'react';
import { AuthModal } from './components/AuthModal';
import { ProgramBuilder } from './components/ProgramBuilder';
import { WorkoutProgram } from './components/WorkoutProgram';
import { Header } from './components/Header';
import { useAuth } from './hooks/useAuth';
import { storage } from './utils/storage';
import { LogOut, User, Target, TrendingUp, Clock, Heart } from 'lucide-react';

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
  const { user, loading: authLoading, isAuthenticated, signOut } = useAuth();
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [showProgram, setShowProgram] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data on app start
  useEffect(() => {
    const loadUserData = () => {
      try {
        if (isAuthenticated) {
          const userData = storage.getUserData(user?.id);
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
    const userData = storage.getUserData(user?.id);
    userData.preferences = preferences;
    storage.saveUserData(userData, user?.id);
  };

  const handleBackToBuilder = () => {
    setShowProgram(false);
    setUserPreferences(null);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUserPreferences(null);
      setShowProgram(false);
      // Clear user-specific data
      if (user?.id) {
        storage.clearData(user.id);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
           {/* Hero Section */}
           <div className="text-center mb-16">
             <h1 className="text-5xl md:text-6xl font-heading text-accent mb-6">
               Custom Workouts.<br />
               <span className="text-primary">Smart Feedback.</span><br />
               Real Progress.
             </h1>
             <p className="text-xl text-accent/70 font-body mb-8 max-w-3xl mx-auto">
               Your AI-powered virtual coach for safe and confident training. 
               Get personalized workout programs tailored to your goals and skill level.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button
                 onClick={() => setShowAuthModal(true)}
                 className="px-8 py-4 bg-primary text-white font-heading rounded-2xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
               >
                 Start Your Journey
               </button>
               <button
                 onClick={() => setShowAuthModal(true)}
                 className="px-8 py-4 bg-white/80 text-primary font-heading rounded-2xl border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 shadow-lg"
               >
                 Sign In
               </button>
             </div>
           </div>

           {/* Features Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
             <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-8 text-center hover:shadow-lg transition-all duration-300">
               <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                 <Target className="h-8 w-8 text-white" />
               </div>
               <h3 className="text-xl font-heading text-accent mb-3">Personalized Programs</h3>
               <p className="text-accent/70 font-body">
                 Get workout programs tailored to your fitness goals, skill level, and available equipment.
               </p>
             </div>

             <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-8 text-center hover:shadow-lg transition-all duration-300">
               <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                 <TrendingUp className="h-8 w-8 text-white" />
               </div>
               <h3 className="text-xl font-heading text-accent mb-3">Track Progress</h3>
               <p className="text-accent/70 font-body">
                 Monitor your fitness journey with streak counters, workout history, and progress analytics.
               </p>
             </div>

             <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-8 text-center hover:shadow-lg transition-all duration-300">
               <div className="w-16 h-16 bg-secondary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                 <Clock className="h-8 w-8 text-white" />
               </div>
               <h3 className="text-xl font-heading text-accent mb-3">Smart Timers</h3>
               <p className="text-accent/70 font-body">
                 Built-in workout timers with rest periods to keep you on track and motivated.
               </p>
             </div>
           </div>

           {/* Call to Action */}
           <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-center text-white">
             <h2 className="text-3xl font-heading mb-4">Ready to Transform Your Fitness?</h2>
             <p className="text-xl mb-8 opacity-90">
               Join thousands of users who are already achieving their fitness goals with Momentum.
             </p>
             <button
               onClick={() => setShowAuthModal(true)}
               className="px-8 py-4 bg-white text-primary font-heading rounded-2xl hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
             >
               Get Started Free
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