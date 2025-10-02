import { supabase } from '../lib/supabase'
import type { Exercise, UserPreferences } from '../App'
import type { UserProfile, WorkoutSession as WorkoutSessionType, ProgressData } from '../types/user'

export interface WorkoutSession {
  id: string
  date: string
  exercises: Exercise[]
  duration: number
  completed: boolean
}

export interface UserData {
  preferences: UserPreferences | null
  profile: UserProfile | null
  favoriteExercises: string[]
  workoutHistory: WorkoutSession[]
  currentStreak: number
  longestStreak: number
  totalWorkouts: number
  lastWorkoutDate: string | null
}

export const supabaseStorage = {
  // Get user profile and preferences
  async getUserData(): Promise<UserData> {
    // Require Supabase configuration
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      throw new Error('Supabase not configured. Please set up VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
    }
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return {
          preferences: null,
          profile: null,
          favoriteExercises: [],
          workoutHistory: [],
          currentStreak: 0,
          longestStreak: 0,
          totalWorkouts: 0,
          lastWorkoutDate: null
        }
      }

      // Helper function to validate and set default preferences
      const validateUserPreferences = (rawPreferences: any): UserPreferences => {
        if (!rawPreferences || typeof rawPreferences !== 'object') {
          return {
            goal: 'muscle-building',
            skillLevel: 'beginner',
            bodyParts: []
          }
        }

        return {
          goal: rawPreferences.goal || 'muscle-building',
          skillLevel: rawPreferences.skillLevel || 'beginner',
          bodyParts: Array.isArray(rawPreferences.bodyParts) ? rawPreferences.bodyParts : []
        }
      }

      // Get user profile
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

      // Get favorite exercises
      const { data: favorites } = await supabase
        .from('favorite_exercises')
        .select('exercise_id')
        .eq('user_id', user.id)

      // Get workout sessions
      const { data: sessions } = await supabase
        .from('workout_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      const favoriteExercises = favorites?.map(f => f.exercise_id) || []
      const workoutHistory: WorkoutSession[] = sessions?.map(session => ({
        id: session.id,
        date: session.created_at || '',
        exercises: session.exercises as Exercise[],
        duration: session.duration,
        completed: session.completed || false
      })) || []

      // Calculate streaks
      const stats = this.calculateStats(workoutHistory)

      return {
        preferences: validateUserPreferences(profile?.preferences),
        profile: profile ? {
          id: profile.id,
          fullName: profile.full_name || 'User',
          age: profile.age || 25,
          gender: profile.gender || 'prefer-not-to-say',
          fitnessGoals: profile.fitness_goals || [],
          preferredWorkoutStyles: profile.preferred_workout_styles || [],
          targetMuscleGroups: profile.target_muscle_groups || [],
          skillLevel: profile.skill_level || 'beginner',
          createdAt: new Date(profile.created_at || Date.now()),
          updatedAt: new Date(profile.updated_at || Date.now())
        } : null,
        favoriteExercises,
        workoutHistory,
        ...stats
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      return {
        preferences: {
          goal: 'muscle-building',
          skillLevel: 'beginner',
          bodyParts: []
        },
        profile: null,
        favoriteExercises: [],
        workoutHistory: [],
        currentStreak: 0,
        longestStreak: 0,
        totalWorkouts: 0,
        lastWorkoutDate: null
      }
    }
  },

  // Save user preferences
  async saveUserPreferences(preferences: UserPreferences): Promise<void> {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('user_profiles')
        .update({ preferences })
        .eq('id', user.id)

      if (error) {
        console.error('Error saving preferences:', error)
      }
    } catch (error) {
      console.error('Error saving preferences:', error)
    }
  },

  // Add exercise to favorites
  async addToFavorites(exerciseId: string): Promise<void> {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('favorite_exercises')
        .insert({
          user_id: user.id,
          exercise_id: exerciseId
        })

      if (error) {
        console.error('Error adding to favorites:', error)
      }
    } catch (error) {
      console.error('Error adding to favorites:', error)
    }
  },

  // Remove exercise from favorites
  async removeFromFavorites(exerciseId: string): Promise<void> {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('favorite_exercises')
        .delete()
        .eq('user_id', user.id)
        .eq('exercise_id', exerciseId)

      if (error) {
        console.error('Error removing from favorites:', error)
      }
    } catch (error) {
      console.error('Error removing from favorites:', error)
    }
  },

  // Check if exercise is favorited
  async isFavorite(exerciseId: string): Promise<boolean> {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) return false;
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return false

      const { data, error } = await supabase
        .from('favorite_exercises')
        .select('id')
        .eq('user_id', user.id)
        .eq('exercise_id', exerciseId)
        .single()

      return !error && !!data
    } catch (error) {
      return false
    }
  },

  // Save workout session
  async saveWorkoutSession(session: Omit<WorkoutSession, 'id'>): Promise<void> {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('workout_sessions')
        .insert({
          user_id: user.id,
          exercises: session.exercises,
          duration: session.duration,
          completed: session.completed,
          workout_date: new Date().toISOString().split('T')[0]
        })

      if (error) {
        console.error('Error saving workout session:', error)
      }
    } catch (error) {
      console.error('Error saving workout session:', error)
    }
  },

  // Get workout statistics
  async getWorkoutStats() {
    const userData = await this.getUserData()
    return this.calculateStats(userData.workoutHistory)
  },

  // Calculate workout statistics
  calculateStats(workoutHistory: WorkoutSession[]) {
    const totalWorkouts = workoutHistory.length
    
    if (totalWorkouts === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalWorkouts: 0,
        workoutsThisWeek: 0,
        workoutsThisMonth: 0,
        averageWorkoutDuration: 0,
        lastWorkoutDate: null
      }
    }

    // Calculate streaks
    const sortedSessions = workoutHistory
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    
    const today = new Date()
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    
    // Check if there's a workout today or yesterday to start streak
    const lastWorkoutDate = sortedSessions[0] ? new Date(sortedSessions[0].date) : null
    const lastWorkoutDateString = lastWorkoutDate?.toDateString()
    
    if (lastWorkoutDate && 
        (lastWorkoutDate.toDateString() === today.toDateString() || 
         lastWorkoutDate.toDateString() === yesterday.toDateString())) {
      
      let currentDate = new Date(lastWorkoutDate)
      
      for (const session of sortedSessions) {
        const sessionDate = new Date(session.date)
        
        if (sessionDate.toDateString() === currentDate.toDateString()) {
          tempStreak++
          currentDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)
        } else if (sessionDate.toDateString() === new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toDateString()) {
          // Skip if same day (multiple workouts)
          continue
        } else {
          break
        }
      }
      
      currentStreak = tempStreak
    }

    // Calculate longest streak
    tempStreak = 0
    let previousDate: Date | null = null
    
    for (const session of sortedSessions) {
      const sessionDate = new Date(session.date)
      
      if (!previousDate || 
          Math.abs(sessionDate.getTime() - previousDate.getTime()) <= 24 * 60 * 60 * 1000) {
        tempStreak++
        longestStreak = Math.max(longestStreak, tempStreak)
      } else {
        tempStreak = 1
      }
      
      previousDate = sessionDate
    }

    // Calculate time-based stats
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const workoutsThisWeek = workoutHistory.filter(session => 
      new Date(session.date) >= weekAgo
    ).length

    const workoutsThisMonth = workoutHistory.filter(session => 
      new Date(session.date) >= monthAgo
    ).length

    const averageWorkoutDuration = Math.round(
      workoutHistory.reduce((sum, session) => sum + session.duration, 0) / totalWorkouts
    )

    return {
      currentStreak,
      longestStreak,
      totalWorkouts,
      workoutsThisWeek,
      workoutsThisMonth,
      averageWorkoutDuration,
      lastWorkoutDate: lastWorkoutDateString || null
    }
  },

  // Save user profile
  async saveUserProfile(profile: UserProfile): Promise<void> {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: profile.id,
          full_name: profile.fullName,
          age: profile.age,
          gender: profile.gender,
          fitness_goals: profile.fitnessGoals,
          preferred_workout_styles: profile.preferredWorkoutStyles,
          target_muscle_groups: profile.targetMuscleGroups,
          skill_level: profile.skillLevel,
          updated_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error saving user profile:', error)
      }
    } catch (error) {
      console.error('Error saving user profile:', error)
    }
  },

  // Save workout session (new format)
  async saveWorkoutSessionNew(session: WorkoutSessionType): Promise<void> {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('workout_sessions')
        .insert({
          id: session.id,
          user_id: session.userId,
          program_id: session.programId,
          started_at: session.startedAt.toISOString(),
          completed_at: session.completedAt?.toISOString(),
          exercises: session.exercises,
          total_duration: session.totalDuration,
          notes: session.notes
        })

      if (error) {
        console.error('Error saving workout session:', error)
      }
    } catch (error) {
      console.error('Error saving workout session:', error)
    }
  }
}