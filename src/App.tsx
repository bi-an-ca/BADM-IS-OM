import React, { useState } from 'react';
import { ProgramBuilder } from './components/ProgramBuilder';
import { WorkoutProgram } from './components/WorkoutProgram';
import { Header } from './components/Header';
import type { UserPreferences } from './utils/storage';

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

  const handleProgramGenerated = (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    setShowProgram(true);
  };

  const handleBackToBuilder = () => {
    setShowProgram(false);
    setUserPreferences(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary-light to-secondary-dark font-body">
      <Header />
      
      {showProgram && userPreferences ? (
        <WorkoutProgram 
          preferences={userPreferences} 
          onBack={handleBackToBuilder} 
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-heading text-accent mb-4">
              Momentum
            </h1>
            <p className="text-xl text-accent/80 font-body mb-8">
              Fitness made simple, safe, and accessible
            </p>
            <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 mb-8 max-w-md mx-auto">
              <p className="text-yellow-800 text-sm font-body">
                🚀 Demo Mode - Full functionality without account required
              </p>
            </div>
          </div>
          
          <ProgramBuilder onProgramGenerated={handleProgramGenerated} />
        </div>
      )}
    </div>
  );
}

export default App;