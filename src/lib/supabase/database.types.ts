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
      cars: {
        Row: {
          id: string
          slug: string
          brand: string
          model: string
          year: number
          price: number
          mileage: number
          fuel_type: 'Diesel' | 'Benzinë' | 'Hybrid' | 'Elektrike'
          transmission: 'Automatik' | 'Manual'
          power_hp: number | null
          color: string | null
          body_type: string | null
          is_new: boolean | null
          featured: boolean | null
          main_image: string
          gallery: string[]
          options: string[] | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          brand: string
          model: string
          year: number
          price: number
          mileage: number
          fuel_type: 'Diesel' | 'Benzinë' | 'Hybrid' | 'Elektrike'
          transmission: 'Automatik' | 'Manual'
          power_hp?: number | null
          color?: string | null
          body_type?: string | null
          is_new?: boolean | null
          featured?: boolean | null
          main_image: string
          gallery: string[]
          options?: string[] | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          brand?: string
          model?: string
          year?: number
          price?: number
          mileage?: number
          fuel_type?: 'Diesel' | 'Benzinë' | 'Hybrid' | 'Elektrike'
          transmission?: 'Automatik' | 'Manual'
          power_hp?: number | null
          color?: string | null
          body_type?: string | null
          is_new?: boolean | null
          featured?: boolean | null
          main_image?: string
          gallery?: string[] | null
          options?: string[] | null
          description?: string | null
          created_at?: string
          updated_at?: string
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
      fuel_type: 'Diesel' | 'Benzinë' | 'Hybrid' | 'Elektrike'
      transmission: 'Automatik' | 'Manual'
    }
  }
}

