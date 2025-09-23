import React, { useState } from 'react';
import { ProgramBuilder } from './components/ProgramBuilder';
import { WorkoutProgram } from './components/WorkoutProgram';
import { Header } from './components/Header';

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