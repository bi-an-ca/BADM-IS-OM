export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          age: number | null
          gender: string | null
          fitness_goals: string[] | null
          preferred_workout_styles: Json | null
          target_muscle_groups: string[] | null
          skill_level: string | null
          preferences: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          age?: number | null
          gender?: string | null
          fitness_goals?: string[] | null
          preferred_workout_styles?: Json | null
          target_muscle_groups?: string[] | null
          skill_level?: string | null
          preferences?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          age?: number | null
          gender?: string | null
          fitness_goals?: string[] | null
          preferred_workout_styles?: Json | null
          target_muscle_groups?: string[] | null
          skill_level?: string | null
          preferences?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      workout_sessions: {
        Row: {
          id: string
          user_id: string
          program_id: string | null
          started_at: string
          completed_at: string | null
          exercises: Json | null
          total_duration: number | null
          notes: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          program_id?: string | null
          started_at: string
          completed_at?: string | null
          exercises?: Json | null
          total_duration?: number | null
          notes?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          program_id?: string | null
          started_at?: string
          completed_at?: string | null
          exercises?: Json | null
          total_duration?: number | null
          notes?: string | null
          created_at?: string | null
        }
      }
      favorite_exercises: {
        Row: {
          id: string
          user_id: string
          exercise_id: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          exercise_id: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          exercise_id?: string
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}