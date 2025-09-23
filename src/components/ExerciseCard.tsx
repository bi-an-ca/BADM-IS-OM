import React, { useState } from 'react';
import { Play, Info, Target, Settings } from 'lucide-react';
import type { Exercise } from '../App';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  dayContext?: string;
}

export function ExerciseCard({ exercise, index, dayContext }: ExerciseCardProps) {
  const [showDetails, setShowDetails] = useState(false);

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
        
        {/* Play Button */}
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
          <Play className="h-8 w-8 ml-1" fill="currentColor" />
        </button>
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

        {/* Equipment */}
        <div className="flex items-center text-accent/70 text-sm">
          <Settings className="h-4 w-4 mr-2" />
          <span className="font-body">Equipment: {exercise.equipment}</span>
        </div>

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