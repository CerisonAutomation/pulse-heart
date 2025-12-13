import { motion } from 'framer-motion';
import { Heart, MessageCircle, Trash2 } from 'lucide-react';
import { mockProfiles } from '@/data/mockData';
import { ProfileCard } from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';

interface FavoritesTabProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onStartChat: (profileId: string) => void;
  onViewProfile: (profileId: string) => void;
}

export function FavoritesTab({ 
  favorites, 
  onToggleFavorite, 
  onStartChat,
  onViewProfile 
}: FavoritesTabProps) {
  const favoritedProfiles = mockProfiles.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Favorites</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {favorites.length} saved {favorites.length === 1 ? 'profile' : 'profiles'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary" />
          </div>
        </div>
      </header>

      {/* Content */}
      {favoritedProfiles.length > 0 ? (
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoritedProfiles.map((profile, index) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                index={index}
                isFavorited={true}
                onFavorite={onToggleFavorite}
                onMessage={onStartChat}
                onClick={() => onViewProfile(profile.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center px-4"
        >
          <motion.div 
            className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-12 h-12 text-primary" />
          </motion.div>
          <h3 className="text-xl font-semibold">No favorites yet</h3>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Start exploring and save profiles you like. They'll appear here for easy access.
          </p>
          <Button className="mt-6 gradient-primary">
            Start Exploring
          </Button>
        </motion.div>
      )}
    </div>
  );
}
