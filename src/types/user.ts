export interface UserProfile {
  id: string;
  fullName: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  fitnessGoals: string[];
  preferredWorkoutStyles: WorkoutStyle[];
  targetMuscleGroups: string[];
  skillLevel: 'beginner' | 'intermediate' | 'expert';
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  type: 'pre-built' | 'custom';
  difficulty: 'beginner' | 'intermediate' | 'expert';
  duration: number; // in minutes
  exercises: ProgramExercise[];
  targetMuscleGroups: string[];
  equipment: string[];
  createdBy: string; // user ID or 'system' for pre-built
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgramExercise {
  id: string;
  exerciseId: string;
  sets: number;
  reps: number | string; // can be "30 seconds" for time-based
  restTime: number; // in seconds
  order: number;
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  programId: string;
  userId: string;
  startedAt: Date;
  completedAt?: Date;
  exercises: CompletedExercise[];
  totalDuration: number; // in minutes
  notes?: string;
}

export interface CompletedExercise {
  exerciseId: string;
  sets: CompletedSet[];
  notes?: string;
}

export interface CompletedSet {
  setNumber: number;
  reps?: number;
  weight?: number;
  duration?: number; // in seconds
  completed: boolean;
  restTime?: number; // in seconds
}

export interface ProgressData {
  userId: string;
  totalWorkouts: number;
  currentStreak: number;
  longestStreak: number;
  totalDuration: number; // in minutes
  favoriteExercises: string[];
  weeklyProgress: WeeklyProgress[];
  lastWorkout?: Date;
}

export interface WeeklyProgress {
  week: string; // YYYY-WW format
  workoutsCompleted: number;
  totalDuration: number;
  averageWorkoutDuration: number;
  exercisesCompleted: number;
}
