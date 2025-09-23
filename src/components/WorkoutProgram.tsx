import React from 'react';
import { ArrowLeft, Clock, Target, TrendingUp, Calendar } from 'lucide-react';
import { WeeklySchedule } from './WeeklySchedule';
import { exerciseDatabase } from '../data/exercises';
import type { UserPreferences, Exercise } from '../App';

interface WorkoutProgramProps {
  preferences: UserPreferences;
  onBack: () => void;
}

export interface WorkoutDay {
  day: string;
  dayName: string;
  focus: string;
  exercises: Exercise[];
  isRestDay: boolean;
  duration: number;
}

export function WorkoutProgram({ preferences, onBack }: WorkoutProgramProps) {
  const generateWeeklyProgram = (): WorkoutDay[] => {
    const { goal, skillLevel, bodyParts } = preferences;
    
    // Define workout split based on selected body parts and goals
    const getWorkoutSplit = () => {
      if (bodyParts.includes('full-body') || bodyParts.length >= 5) {
        return [
          { day: 'Monday', focus: 'Upper Body Push', targetMuscles: ['Chest', 'Shoulders', 'Arms'] },
          { day: 'Tuesday', focus: 'Lower Body', targetMuscles: ['Legs', 'Glutes'] },
          { day: 'Wednesday', focus: 'Rest Day', targetMuscles: [] },
          { day: 'Thursday', focus: 'Upper Body Pull', targetMuscles: ['Back', 'Arms'] },
          { day: 'Friday', focus: 'Core & Cardio', targetMuscles: ['Abs', 'Cardio'] },
          { day: 'Saturday', focus: 'Full Body Circuit', targetMuscles: ['Full Body', 'Cardio'] },
          { day: 'Sunday', focus: 'Active Recovery', targetMuscles: [] }
        ];
      } else if (bodyParts.length >= 3) {
        return [
          { day: 'Monday', focus: 'Primary Focus', targetMuscles: bodyParts.slice(0, 2) },
          { day: 'Tuesday', focus: 'Cardio & Core', targetMuscles: ['Cardio', 'Abs'] },
          { day: 'Wednesday', focus: 'Rest Day', targetMuscles: [] },
          { day: 'Thursday', focus: 'Secondary Focus', targetMuscles: bodyParts.slice(1) },
          { day: 'Friday', focus: 'Full Body', targetMuscles: ['Full Body'] },
          { day: 'Saturday', focus: 'Rest Day', targetMuscles: [] },
          { day: 'Sunday', focus: 'Active Recovery', targetMuscles: [] }
        ];
      } else {
        return [
          { day: 'Monday', focus: 'Primary Focus', targetMuscles: bodyParts },
          { day: 'Tuesday', focus: 'Cardio', targetMuscles: ['Cardio'] },
          { day: 'Wednesday', focus: 'Rest Day', targetMuscles: [] },
          { day: 'Thursday', focus: 'Primary Focus', targetMuscles: bodyParts },
          { day: 'Friday', focus: 'Full Body', targetMuscles: ['Full Body', 'Cardio'] },
          { day: 'Saturday', focus: 'Rest Day', targetMuscles: [] },
          { day: 'Sunday', focus: 'Active Recovery', targetMuscles: [] }
        ];
      }
    };

    const workoutSplit = getWorkoutSplit();
    
    return workoutSplit.map((dayPlan) => {
      if (dayPlan.focus === 'Rest Day' || dayPlan.focus === 'Active Recovery') {
        return {
          day: dayPlan.day.substring(0, 3),
          dayName: dayPlan.day,
          focus: dayPlan.focus,
          exercises: [],
          isRestDay: true,
          duration: 0
        };
      }

      // Filter exercises based on the day's target muscles and user preferences
      let dayExercises = exerciseDatabase.filter(exercise => {
        // Match skill level
        const skillMatch = exercise.difficulty === skillLevel || 
                          (skillLevel === 'expert' && exercise.difficulty === 'intermediate') ||
                          (skillLevel === 'intermediate' && exercise.difficulty === 'beginner');
        
        // Match target muscles for the day
        const muscleMatch = dayPlan.targetMuscles.some(targetMuscle => 
          exercise.muscleGroups.some(exerciseMuscle => 
            exerciseMuscle.toLowerCase().includes(targetMuscle.toLowerCase()) ||
            targetMuscle.toLowerCase().includes(exerciseMuscle.toLowerCase()) ||
            targetMuscle === 'Full Body'
          )
        );
        
        return skillMatch && muscleMatch;
      });

      // Goal-specific filtering
      if (goal === 'cardio-endurance' && dayPlan.focus.includes('Cardio')) {
        dayExercises = dayExercises.filter(ex => 
          ex.muscleGroups.includes('Cardio') || 
          ex.name.toLowerCase().includes('burpee') ||
          ex.name.toLowerCase().includes('mountain') ||
          ex.equipment === 'Bodyweight'
        );
      }

      // Select 4-6 exercises per workout day
      const shuffled = dayExercises.sort(() => 0.5 - Math.random());
      const selectedExercises = shuffled.slice(0, Math.min(6, Math.max(4, shuffled.length)));
      
      // Calculate duration (4-5 minutes per exercise including rest)
      const duration = selectedExercises.length * 4.5;

      return {
        day: dayPlan.day.substring(0, 3),
        dayName: dayPlan.day,
        focus: dayPlan.focus,
        exercises: selectedExercises,
        isRestDay: false,
        duration: Math.ceil(duration)
      };
    });
  };

  const weeklyProgram = generateWeeklyProgram();
  
  const getTotalWeeklyDuration = () => {
    return weeklyProgram.reduce((total, day) => total + day.duration, 0);
  };

  const getWorkoutDays = () => {
    return weeklyProgram.filter(day => !day.isRestDay).length;
  };

  const getGoalLabel = (goal: string) => {
    const goalMap: { [key: string]: string } = {
      'weight-loss': 'Weight Loss',
      'muscle-building': 'Muscle Building',
      'strength-training': 'Strength Training',
      'cardio-endurance': 'Cardio Endurance'
    };
    return goalMap[goal] || goal;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-accent/70 hover:text-accent mb-6 transition-colors font-body"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Builder
        </button>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-light/50 p-8 mb-8 shadow-lg">
          <h1 className="text-3xl font-heading text-accent mb-2">Custom Workouts. Smart Feedback. Real Progress.</h1>
          <p className="text-accent/70 font-body mb-6">Your AI-powered virtual coach for safe and confident training</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-accent/70 text-sm font-body">Goal</p>
                <p className="text-accent font-heading">{getGoalLabel(preferences.goal)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-accent/70 text-sm font-body">Level</p>
                <p className="text-accent font-heading capitalize">{preferences.skillLevel}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary-light rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-accent/70 text-sm font-body">Weekly Time</p>
                <p className="text-accent font-heading">{getTotalWeeklyDuration()} minutes</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-accent/70 text-sm font-body">Workout Days</p>
                <p className="text-accent font-heading">{getWorkoutDays()} days/week</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-accent/70 text-sm mb-2 font-body">Primary Focus Areas</p>
            <div className="flex flex-wrap gap-2">
              {preferences.bodyParts.map((bodyPart) => (
                <span
                  key={bodyPart}
                  className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm capitalize font-body"
                >
                  {bodyPart.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <WeeklySchedule weeklyProgram={weeklyProgram} />
    </div>
  );
}