export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      album_photos: {
        Row: {
          album_id: string
          caption: string | null
          created_at: string | null
          id: string
          order_index: number | null
          url: string
          user_id: string
        }
        Insert: {
          album_id: string
          caption?: string | null
          created_at?: string | null
          id?: string
          order_index?: number | null
          url: string
          user_id: string
        }
        Update: {
          album_id?: string
          caption?: string | null
          created_at?: string | null
          id?: string
          order_index?: number | null
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_photos_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      albums: {
        Row: {
          cover_url: string | null
          created_at: string | null
          description: string | null
          id: string
          is_private: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      blocks: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string | null
          id: string
        }
        Insert: {
          blocked_id: string
          blocker_id: string
          created_at?: string | null
          id?: string
        }
        Update: {
          blocked_id?: string
          blocker_id?: string
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_date: string
          created_at: string | null
          duration_hours: number
          id: string
          location: string | null
          notes: string | null
          payment_status: string | null
          provider_id: string
          seeker_id: string
          start_time: string
          status: string | null
          stripe_payment_id: string | null
          total_amount: number | null
          updated_at: string | null
        }
        Insert: {
          booking_date: string
          created_at?: string | null
          duration_hours?: number
          id?: string
          location?: string | null
          notes?: string | null
          payment_status?: string | null
          provider_id: string
          seeker_id: string
          start_time: string
          status?: string | null
          stripe_payment_id?: string | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          booking_date?: string
          created_at?: string | null
          duration_hours?: number
          id?: string
          location?: string | null
          notes?: string | null
          payment_status?: string | null
          provider_id?: string
          seeker_id?: string
          start_time?: string
          status?: string | null
          stripe_payment_id?: string | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          last_message_at: string | null
          participant_one: string
          participant_two: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          participant_one: string
          participant_two: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          participant_one?: string
          participant_two?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_participant_one_fkey"
            columns: ["participant_one"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "conversations_participant_two_fkey"
            columns: ["participant_two"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      event_attendees: {
        Row: {
          event_id: string
          id: string
          joined_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          joined_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          joined_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_attendees_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          cover_image: string | null
          created_at: string | null
          description: string | null
          end_time: string | null
          event_date: string
          event_type: string
          host_id: string
          id: string
          is_premium_only: boolean | null
          is_public: boolean | null
          latitude: number | null
          location: string
          longitude: number | null
          max_attendees: number | null
          start_time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          event_date: string
          event_type?: string
          host_id: string
          id?: string
          is_premium_only?: boolean | null
          is_public?: boolean | null
          latitude?: number | null
          location: string
          longitude?: number | null
          max_attendees?: number | null
          start_time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          event_date?: string
          event_type?: string
          host_id?: string
          id?: string
          is_premium_only?: boolean | null
          is_public?: boolean | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          max_attendees?: number | null
          start_time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string | null
          favorited_user_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          favorited_user_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          favorited_user_id?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      gdpr_consent_records: {
        Row: {
          consent_given: boolean
          consent_type: string
          consent_version: string | null
          given_at: string | null
          id: string
          ip_address: unknown
          user_agent: string | null
          user_id: string
          withdrawn_at: string | null
        }
        Insert: {
          consent_given: boolean
          consent_type: string
          consent_version?: string | null
          given_at?: string | null
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          user_id: string
          withdrawn_at?: string | null
        }
        Update: {
          consent_given?: boolean
          consent_type?: string
          consent_version?: string | null
          given_at?: string | null
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          user_id?: string
          withdrawn_at?: string | null
        }
        Relationships: []
      }
      gdpr_data_requests: {
        Row: {
          download_expires_at: string | null
          download_url: string | null
          id: string
          notes: string | null
          processed_at: string | null
          processed_by: string | null
          request_type: string
          requested_at: string | null
          scheduled_deletion_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          download_expires_at?: string | null
          download_url?: string | null
          id?: string
          notes?: string | null
          processed_at?: string | null
          processed_by?: string | null
          request_type: string
          requested_at?: string | null
          scheduled_deletion_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          download_expires_at?: string | null
          download_url?: string | null
          id?: string
          notes?: string | null
          processed_at?: string | null
          processed_by?: string | null
          request_type?: string
          requested_at?: string | null
          scheduled_deletion_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      matches: {
        Row: {
          id: string
          matched_at: string | null
          user_one: string
          user_two: string
        }
        Insert: {
          id?: string
          matched_at?: string | null
          user_one: string
          user_two: string
        }
        Update: {
          id?: string
          matched_at?: string | null
          user_one?: string
          user_two?: string
        }
        Relationships: []
      }
      meet_now: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          latitude: number
          longitude: number
          message: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          latitude: number
          longitude: number
          message?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          latitude?: number
          longitude?: number
          message?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      message_reactions: {
        Row: {
          created_at: string | null
          emoji: string
          id: string
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          emoji: string
          id?: string
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          emoji?: string
          id?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          is_read: boolean | null
          media_url: string | null
          message_type: string | null
          read_at: string | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          media_url?: string | null
          message_type?: string | null
          read_at?: string | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          media_url?: string | null
          message_type?: string | null
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      parties: {
        Row: {
          cover_image: string | null
          created_at: string | null
          description: string | null
          dress_code: string | null
          end_time: string | null
          host_id: string
          id: string
          is_active: boolean | null
          latitude: number
          location: string
          longitude: number
          max_guests: number | null
          party_type: string
          start_time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          dress_code?: string | null
          end_time?: string | null
          host_id: string
          id?: string
          is_active?: boolean | null
          latitude: number
          location: string
          longitude: number
          max_guests?: number | null
          party_type?: string
          start_time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          dress_code?: string | null
          end_time?: string | null
          host_id?: string
          id?: string
          is_active?: boolean | null
          latitude?: number
          location?: string
          longitude?: number
          max_guests?: number | null
          party_type?: string
          start_time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      party_rsvps: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          party_id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          party_id: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          party_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "party_rsvps_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "parties"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_photos: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean | null
          order_index: number | null
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          order_index?: number | null
          url: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          order_index?: number | null
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      profile_views: {
        Row: {
          id: string
          viewed_at: string | null
          viewed_id: string
          viewer_id: string
        }
        Insert: {
          id?: string
          viewed_at?: string | null
          viewed_id: string
          viewer_id: string
        }
        Update: {
          id?: string
          viewed_at?: string | null
          viewed_id?: string
          viewer_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_deletion_requested_at: string | null
          age: number | null
          age_verified: boolean | null
          age_verified_at: string | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          country: string | null
          created_at: string | null
          data_processing_consent: boolean | null
          date_of_birth: string | null
          display_name: string | null
          favorites_count: number | null
          gdpr_consent_date: string | null
          height: number | null
          hourly_rate: number | null
          id: string
          id_verified: boolean | null
          id_verified_at: string | null
          interests: string[] | null
          is_available_now: boolean | null
          is_online: boolean | null
          is_verified: boolean | null
          last_seen: string | null
          latitude: number | null
          longitude: number | null
          looking_for: string[] | null
          marketing_consent: boolean | null
          phone_verified: boolean | null
          phone_verified_at: string | null
          photo_verified: boolean | null
          photo_verified_at: string | null
          rating: number | null
          tribes: string[] | null
          updated_at: string | null
          user_id: string
          views_count: number | null
          weight: number | null
        }
        Insert: {
          account_deletion_requested_at?: string | null
          age?: number | null
          age_verified?: boolean | null
          age_verified_at?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          data_processing_consent?: boolean | null
          date_of_birth?: string | null
          display_name?: string | null
          favorites_count?: number | null
          gdpr_consent_date?: string | null
          height?: number | null
          hourly_rate?: number | null
          id?: string
          id_verified?: boolean | null
          id_verified_at?: string | null
          interests?: string[] | null
          is_available_now?: boolean | null
          is_online?: boolean | null
          is_verified?: boolean | null
          last_seen?: string | null
          latitude?: number | null
          longitude?: number | null
          looking_for?: string[] | null
          marketing_consent?: boolean | null
          phone_verified?: boolean | null
          phone_verified_at?: string | null
          photo_verified?: boolean | null
          photo_verified_at?: string | null
          rating?: number | null
          tribes?: string[] | null
          updated_at?: string | null
          user_id: string
          views_count?: number | null
          weight?: number | null
        }
        Update: {
          account_deletion_requested_at?: string | null
          age?: number | null
          age_verified?: boolean | null
          age_verified_at?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          data_processing_consent?: boolean | null
          date_of_birth?: string | null
          display_name?: string | null
          favorites_count?: number | null
          gdpr_consent_date?: string | null
          height?: number | null
          hourly_rate?: number | null
          id?: string
          id_verified?: boolean | null
          id_verified_at?: string | null
          interests?: string[] | null
          is_available_now?: boolean | null
          is_online?: boolean | null
          is_verified?: boolean | null
          last_seen?: string | null
          latitude?: number | null
          longitude?: number | null
          looking_for?: string[] | null
          marketing_consent?: boolean | null
          phone_verified?: boolean | null
          phone_verified_at?: string | null
          photo_verified?: boolean | null
          photo_verified_at?: string | null
          rating?: number | null
          tribes?: string[] | null
          updated_at?: string | null
          user_id?: string
          views_count?: number | null
          weight?: number | null
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth_key: string
          created_at: string | null
          endpoint: string
          id: string
          p256dh: string
          user_id: string
        }
        Insert: {
          auth_key: string
          created_at?: string | null
          endpoint: string
          id?: string
          p256dh: string
          user_id: string
        }
        Update: {
          auth_key?: string
          created_at?: string | null
          endpoint?: string
          id?: string
          p256dh?: string
          user_id?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          details: string | null
          id: string
          reason: string
          reported_id: string
          reporter_id: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          details?: string | null
          id?: string
          reason: string
          reported_id: string
          reporter_id: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          details?: string | null
          id?: string
          reason?: string
          reported_id?: string
          reporter_id?: string
          status?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      verification_documents: {
        Row: {
          deleted_at: string | null
          document_type: string
          id: string
          request_id: string
          storage_path: string
          uploaded_at: string | null
        }
        Insert: {
          deleted_at?: string | null
          document_type: string
          id?: string
          request_id: string
          storage_path: string
          uploaded_at?: string | null
        }
        Update: {
          deleted_at?: string | null
          document_type?: string
          id?: string
          request_id?: string
          storage_path?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_documents_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "verification_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_requests: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          metadata: Json | null
          reviewed_at: string | null
          reviewer_id: string | null
          reviewer_notes: string | null
          status: string | null
          submitted_at: string | null
          user_id: string
          verification_type: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          reviewer_notes?: string | null
          status?: string | null
          submitted_at?: string | null
          user_id: string
          verification_type: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          reviewer_notes?: string | null
          status?: string | null
          submitted_at?: string | null
          user_id?: string
          verification_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "seeker" | "provider" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["seeker", "provider", "admin"],
    },
  },
} as const
