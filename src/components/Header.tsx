import React, { useState } from 'react';
import { Dumbbell, BarChart3, Heart, Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { ProgressTracker } from './ProgressTracker';
import { useAuth } from '../hooks/useAuth';
import { supabaseStorage } from '../utils/supabaseStorage';

export function Header() {
  const { user, signOut } = useAuth();
  const [showProgress, setShowProgress] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  // Load user data
  React.useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const userData = await supabaseStorage.getUserData();
        setFavoriteCount(userData.favoriteExercises.length);
        setCurrentStreak(userData.currentStreak);
      }
    };
    loadUserData();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="bg-white/90 backdrop-blur-sm border-b border-secondary-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-xl">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading text-accent">Momentum</h1>
                <p className="text-sm text-accent/70 font-body">Fitness made simple, safe, and accessible</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setShowProgress(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
              >
                <BarChart3 className="h-5 w-5" />
                <span className="font-body">Progress</span>
                {currentStreak > 0 && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    {currentStreak}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setShowFavorites(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-accent/10 text-accent rounded-xl hover:bg-accent/20 transition-colors"
              >
                <Heart className="h-5 w-5" />
                <span className="font-body">Favorites</span>
                {favoriteCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {favoriteCount}
                  </span>
                )}
              </button>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 bg-accent/10 text-accent rounded-xl hover:bg-accent/20 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="font-body">Account</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-xl border border-secondary-light/50 shadow-lg z-50">
                    <div className="p-4 border-b border-secondary-light/30">
                      <p className="text-accent font-heading text-sm">Signed in as</p>
                      <p className="text-accent/70 font-body text-sm truncate">{user?.email}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="font-body">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-accent hover:text-primary transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 pt-4 border-t border-secondary-light/30">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setShowProgress(true);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span className="font-body">Progress</span>
                  {currentStreak > 0 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      {currentStreak}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    setShowFavorites(true);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-accent/10 text-accent rounded-xl hover:bg-accent/20 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span className="font-body">Favorites</span>
                  {favoriteCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {favoriteCount}
                    </span>
                  )}
                </button>
                
                <div className="pt-2 border-t border-secondary-light/30">
                  <div className="px-4 py-2 text-accent/70 text-sm font-body">
                    {user?.email}
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="font-body">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Progress Modal */}
      {showProgress && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ProgressTracker onClose={() => setShowProgress(false)} />
          </div>
        </div>
      )}

      {/* Favorites Modal */}
      {showFavorites && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <FavoritesList onClose={() => setShowFavorites(false)} />
          </div>
        </div>
      )}
    </>
  );
}

// Favorites List Component
function FavoritesList({ onClose }: { onClose: () => void }) {
  const [favoriteExercises, setFavoriteExercises] = useState<any[]>([]);
  const { exerciseDatabase } = require('../data/exercises');
  
  React.useEffect(() => {
    const loadFavorites = async () => {
      const userData = await supabaseStorage.getUserData();
      const favorites = exerciseDatabase.filter((exercise: any) => 
        userData.favoriteExercises.includes(exercise.id)
      );
      setFavoriteExercises(favorites);
    };
    loadFavorites();
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading text-accent">Your Favorite Exercises</h2>
        <button
          onClick={onClose}
          className="text-accent/70 hover:text-accent transition-colors"
        >
          ✕
        </button>
      </div>

      {favoriteExercises.length === 0 ? (
        <div className="text-center py-8">
          <Heart className="h-16 w-16 text-accent/30 mx-auto mb-4" />
          <p className="text-accent/70 font-body">No favorite exercises yet. Start adding some!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favoriteExercises.map((exercise: any) => (
            <div key={exercise.id} className="bg-white/60 rounded-xl p-4 border border-secondary-light/30">
              <h3 className="font-heading text-accent mb-2">{exercise.name}</h3>
              <p className="text-accent/70 text-sm font-body mb-2">{exercise.description}</p>
              <div className="flex flex-wrap gap-1">
                {exercise.muscleGroups.map((muscle: string) => (
                  <span key={muscle} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}