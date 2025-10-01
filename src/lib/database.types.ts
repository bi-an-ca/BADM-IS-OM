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
          full_name: string
          preferences: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name: string
          preferences?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string
          preferences?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      workout_sessions: {
        Row: {
          id: string
          user_id: string
          exercises: Json
          duration: number
          completed: boolean | null
          workout_date: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          exercises?: Json
          duration?: number
          completed?: boolean | null
          workout_date?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          exercises?: Json
          duration?: number
          completed?: boolean | null
          workout_date?: string | null
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