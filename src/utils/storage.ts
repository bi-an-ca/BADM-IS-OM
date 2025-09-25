import type { Exercise, UserPreferences } from '../App';

export interface WorkoutSession {
  id: string;
  date: string;
  exercises: Exercise[];
  duration: number;
  completed: boolean;
}

export interface UserData {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  } | null;
  preferences: UserPreferences | null;
  favoriteExercises: string[];
  workoutHistory: WorkoutSession[];
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
  lastWorkoutDate: string | null;
}

const STORAGE_KEY = 'momentum-fitness-data';

// Get user-specific storage key
const getUserStorageKey = (userId?: string) => {
  return userId ? `${STORAGE_KEY}-${userId}` : STORAGE_KEY;
};

export const storage = {
  // Get user data from localStorage
  getUserData(userId?: string): UserData {
    try {
      const data = localStorage.getItem(getUserStorageKey(userId));
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
    
    return {
      user: null,
      preferences: null,
      favoriteExercises: [],
      workoutHistory: [],
      currentStreak: 0,
      longestStreak: 0,
      totalWorkouts: 0,
      lastWorkoutDate: null
    };
  },

  // Save user data to localStorage
  saveUserData(data: UserData, userId?: string): void {
    try {
      localStorage.setItem(getUserStorageKey(userId), JSON.stringify(data));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  },

  // Add exercise to favorites
  addToFavorites(exerciseId: string, userId?: string): void {
    const data = this.getUserData(userId);
    if (!data.favoriteExercises.includes(exerciseId)) {
      data.favoriteExercises.push(exerciseId);
      this.saveUserData(data, userId);
    }
  },

  // Remove exercise from favorites
  removeFromFavorites(exerciseId: string, userId?: string): void {
    const data = this.getUserData(userId);
    data.favoriteExercises = data.favoriteExercises.filter(id => id !== exerciseId);
    this.saveUserData(data, userId);
  },

  // Check if exercise is favorited
  isFavorite(exerciseId: string, userId?: string): boolean {
    const data = this.getUserData(userId);
    return data.favoriteExercises.includes(exerciseId);
  },

  // Save workout session
  saveWorkoutSession(session: Omit<WorkoutSession, 'id'>, userId?: string): void {
    const data = this.getUserData(userId);
    const newSession: WorkoutSession = {
      ...session,
      id: Date.now().toString()
    };
    
    data.workoutHistory.unshift(newSession);
    data.totalWorkouts++;
    
    // Update streak
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    if (data.lastWorkoutDate === yesterday || data.lastWorkoutDate === today) {
      data.currentStreak++;
    } else if (data.lastWorkoutDate !== today) {
      data.currentStreak = 1;
    }
    
    data.longestStreak = Math.max(data.longestStreak, data.currentStreak);
    data.lastWorkoutDate = today;
    
    this.saveUserData(data, userId);
  },

  // Get workout statistics
  getWorkoutStats(userId?: string) {
    const data = this.getUserData(userId);
    const last7Days = data.workoutHistory.filter(session => {
      const sessionDate = new Date(session.date);
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return sessionDate >= sevenDaysAgo;
    });

    const last30Days = data.workoutHistory.filter(session => {
      const sessionDate = new Date(session.date);
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return sessionDate >= thirtyDaysAgo;
    });

    return {
      currentStreak: data.currentStreak,
      longestStreak: data.longestStreak,
      totalWorkouts: data.totalWorkouts,
      workoutsThisWeek: last7Days.length,
      workoutsThisMonth: last30Days.length,
      averageWorkoutDuration: data.workoutHistory.length > 0 
        ? Math.round(data.workoutHistory.reduce((sum, session) => sum + session.duration, 0) / data.workoutHistory.length)
        : 0
    };
  },

  // Clear all data
  clearData(userId?: string): void {
    localStorage.removeItem(getUserStorageKey(userId));
  }
};
