import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import { Profile } from './useProfile';

export const useFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data: favData, error } = await supabase
        .from('favorites')
        .select('favorited_user_id')
        .eq('user_id', user.id);

      if (error) throw error;

      if (!favData || favData.length === 0) return [];

      // Fetch profiles of favorited users
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .in('user_id', favData.map((f) => f.favorited_user_id));

      if (profilesError) throw profilesError;
      return profiles as Profile[];
    },
    enabled: !!user,
  });

  const { data: favoriteIds } = useQuery({
    queryKey: ['favorite-ids', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('favorites')
        .select('favorited_user_id')
        .eq('user_id', user.id);

      if (error) throw error;
      return data.map((f) => f.favorited_user_id);
    },
    enabled: !!user,
  });

  const toggleFavorite = useMutation({
    mutationFn: async (profileUserId: string) => {
      if (!user) throw new Error('Not authenticated');

      const isFavorited = favoriteIds?.includes(profileUserId);

      if (isFavorited) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('favorited_user_id', profileUserId);

        if (error) throw error;
        return { action: 'removed', profileUserId };
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            favorited_user_id: profileUserId,
          });

        if (error) throw error;
        return { action: 'added', profileUserId };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['favorite-ids', user?.id] });
      
      toast({
        title: result.action === 'added' ? 'Added to favorites' : 'Removed from favorites',
        description: result.action === 'added' 
          ? 'Profile saved to your favorites' 
          : 'Profile removed from your favorites',
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

  const isFavorite = (profileUserId: string) => {
    return favoriteIds?.includes(profileUserId) || false;
  };

  return {
    favorites: favorites || [],
    favoriteIds: favoriteIds || [],
    isLoading,
    toggleFavorite: toggleFavorite.mutate,
    isFavorite,
    isToggling: toggleFavorite.isPending,
  };
};
