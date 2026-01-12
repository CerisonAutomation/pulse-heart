import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  city: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  tribes: string[];
  interests: string[];
  looking_for: string[];
  is_verified: boolean;
  is_online: boolean;
  last_seen: string;
  hourly_rate: number | null;
  is_available_now: boolean;
  views_count: number;
  favorites_count: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!user,
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast({
        title: 'Profile updated',
        description: 'Your profile has been saved successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const uploadAvatar = async (file: File) => {
    if (!user) throw new Error('Not authenticated');

    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    await updateProfile.mutateAsync({ avatar_url: publicUrl });
    return publicUrl;
  };

  return {
    profile,
    isLoading,
    error,
    updateProfile: updateProfile.mutate,
    uploadAvatar,
    isUpdating: updateProfile.isPending,
  };
};

export const useProfiles = (filters?: {
  tribes?: string[];
  minAge?: number;
  maxAge?: number;
  isOnline?: boolean;
  isVerified?: boolean;
  city?: string;
}) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['profiles', filters],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*')
        .neq('user_id', user?.id || '')
        .order('is_online', { ascending: false })
        .order('last_seen', { ascending: false });

      if (filters?.minAge) {
        query = query.gte('age', filters.minAge);
      }
      if (filters?.maxAge) {
        query = query.lte('age', filters.maxAge);
      }
      if (filters?.isOnline) {
        query = query.eq('is_online', true);
      }
      if (filters?.isVerified) {
        query = query.eq('is_verified', true);
      }
      if (filters?.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }
      if (filters?.tribes && filters.tribes.length > 0) {
        query = query.overlaps('tribes', filters.tribes);
      }

      const { data, error } = await query.limit(50);
      if (error) throw error;
      return data as Profile[];
    },
    enabled: !!user,
  });
};

export const useProfileById = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!userId,
  });
};
