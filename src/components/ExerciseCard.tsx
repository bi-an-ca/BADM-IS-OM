import React, { useState } from 'react';
import { Play, Info, Target, Settings, Heart, Timer } from 'lucide-react';
import type { Exercise } from '../App';
import { storage } from '../utils/storage';
import { WorkoutTimer } from './WorkoutTimer';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  dayContext?: string;
}

export function ExerciseCard({ exercise, index, dayContext }: ExerciseCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorite status
  React.useEffect(() => {
    const loadFavoriteStatus = async () => {
      const favorite = storage.isFavorite(exercise.id);
      setIsFavorite(favorite);
    };
    loadFavoriteStatus();
  }, [exercise.id]);

  const getMuscleGroupColor = (muscleGroup: string) => {
    const colorMap: { [key: string]: string } = {
      'chest': 'bg-primary',
      'back': 'bg-accent',
      'shoulders': 'bg-secondary-light',
      'arms': 'bg-primary',
      'legs': 'bg-accent',
      'glutes': 'bg-secondary-light',
      'abs': 'bg-primary',
      'cardio': 'bg-accent',
    };
    
    const key = muscleGroup.toLowerCase();
    return colorMap[key] || 'bg-accent';
  };

  const handleFavoriteToggle = async () => {
    if (isFavorite) {
      storage.removeFromFavorites(exercise.id);
    } else {
      storage.addToFavorites(exercise.id);
    }
    setIsFavorite(!isFavorite);
  };

  const getExerciseDuration = () => {
    // Different durations based on exercise type
    if (exercise.muscleGroups.includes('Cardio')) {
      return 60; // 1 minute for cardio
    } else if (exercise.difficulty === 'beginner') {
      return 30; // 30 seconds for beginner
    } else if (exercise.difficulty === 'intermediate') {
      return 45; // 45 seconds for intermediate
    } else {
      return 60; // 1 minute for advanced
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 overflow-hidden hover:border-primary/50 transition-all duration-300 group hover:shadow-lg">
      {/* Exercise Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={exercise.imageUrl}
          alt={exercise.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Exercise Number */}
        <div className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-r from-slate-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
        </div>
        <div className="absolute top-4 left-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-heading">
          {index + 1}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2">
          <button 
            onClick={() => setShowTimer(!showTimer)}
            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
          >
            <Play className="h-8 w-8 ml-1" fill="currentColor" />
          </button>
          <button 
            onClick={handleFavoriteToggle}
            className={`w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isFavorite ? 'bg-red-500/80 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Exercise Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-heading text-accent mb-2">{exercise.name}</h3>
            <p className="text-accent/70 text-sm leading-relaxed font-body">{exercise.description}</p>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 text-accent/70 hover:text-accent transition-colors"
          >
            <Info className="h-5 w-5" />
          </button>
        </div>

        {/* Muscle Groups */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Target className="h-4 w-4 text-accent/70 mr-2" />
            <span className="text-accent/70 text-sm font-body">Target Muscles</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {exercise.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className={`px-2 py-1 text-white text-xs rounded-full font-body ${getMuscleGroupColor(muscle)}`}
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Equipment and Duration */}
        <div className="flex items-center justify-between text-accent/70 text-sm mb-4">
          <div className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            <span className="font-body">Equipment: {exercise.equipment}</span>
          </div>
          <div className="flex items-center">
            <Timer className="h-4 w-4 mr-1" />
            <span className="font-body">{getExerciseDuration()}s</span>
          </div>
        </div>

        {/* Timer Component */}
        {showTimer && (
          <div className="mb-4">
            <WorkoutTimer
              exerciseName={exercise.name}
              duration={getExerciseDuration()}
              restDuration={15}
              onComplete={() => {
                setShowTimer(false);
                // Save workout session
                storage.saveWorkoutSession({
                  date: new Date().toISOString(),
                  exercises: [exercise],
                  duration: getExerciseDuration(),
                  completed: true
                });
              }}
            />
          </div>
        )}

        {/* Detailed Instructions (Collapsible) */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-secondary-light/30">
            <h4 className="text-accent font-heading mb-2">Instructions</h4>
            <ol className="text-accent/70 text-sm space-y-1">
              {exercise.instructions.map((instruction, idx) => (
                <li key={idx} className="flex">
                  <span className="text-primary font-heading mr-2">{idx + 1}.</span>
                  <span className="font-body">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}