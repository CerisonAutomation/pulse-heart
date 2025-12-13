import { motion } from 'framer-motion';
import { MapPin, Heart, MessageCircle, BadgeCheck, Crown, Star } from 'lucide-react';
import { Profile } from '@/types';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  profile: Profile;
  index?: number;
  onFavorite?: (id: string) => void;
  onMessage?: (id: string) => void;
  onClick?: (profile: Profile) => void;
  isFavorited?: boolean;
}

export function ProfileCard({ 
  profile, 
  index = 0, 
  onFavorite, 
  onMessage, 
  onClick,
  isFavorited = false 
}: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => onClick?.(profile)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Online Indicator */}
      {profile.isOnline && (
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/30">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-green-400">Online</span>
        </div>
      )}

      {/* Premium/Verified Badges */}
      <div className="absolute top-3 right-3 flex gap-1.5">
        {profile.isPremium && (
          <div className="w-8 h-8 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 flex items-center justify-center">
            <Crown className="w-4 h-4 text-gold" />
          </div>
        )}
        {profile.isVerified && (
          <div className="w-8 h-8 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
            <BadgeCheck className="w-4 h-4 text-primary" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              {profile.name}, {profile.age}
            </h3>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{profile.distance ? `${profile.distance} mi` : profile.location}</span>
            </div>
            {profile.role === 'provider' && profile.rating && (
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <span className="text-sm font-medium text-gold">{profile.rating}</span>
                <span className="text-xs text-muted-foreground">({profile.reviewCount})</span>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMessage?.(profile.id);
              }}
              className="w-10 h-10 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFavorite?.(profile.id);
              }}
              className={cn(
                "w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300",
                isFavorited 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary/80 hover:bg-primary/20"
              )}
            >
              <Heart 
                className={cn(
                  "w-5 h-5 transition-all",
                  isFavorited && "fill-current scale-110"
                )} 
              />
            </button>
          </div>
        </div>

        {/* Tribes */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {profile.tribes.slice(0, 2).map((tribe) => (
            <span
              key={tribe}
              className="px-2 py-0.5 text-xs font-medium rounded-full bg-muted/50 text-muted-foreground"
            >
              {tribe}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
