import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { ProfileCard } from '@/components/ProfileCard';
import { FilterDialog } from '@/components/FilterDialog';
import { ProfileDetail } from '@/components/ProfileDetail';
import { mockProfiles } from '@/data/mockData';
import { Profile, FilterPreferences } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ExploreTabProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onStartChat: (profileId: string) => void;
}

export function ExploreTab({ favorites, onToggleFavorite, onStartChat }: ExploreTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [filters, setFilters] = useState<FilterPreferences>({
    ageRange: [18, 60],
    distanceRadius: 50,
    tribes: [],
    lookingFor: [],
    showOnlineOnly: false,
    showVerifiedOnly: false,
  });

  const filteredProfiles = useMemo(() => {
    return mockProfiles.filter((profile) => {
      // Search filter
      if (searchQuery && !profile.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Age filter
      if (profile.age < filters.ageRange[0] || profile.age > filters.ageRange[1]) {
        return false;
      }
      
      // Distance filter
      if (profile.distance && profile.distance > filters.distanceRadius) {
        return false;
      }
      
      // Online only filter
      if (filters.showOnlineOnly && !profile.isOnline) {
        return false;
      }
      
      // Verified only filter
      if (filters.showVerifiedOnly && !profile.isVerified) {
        return false;
      }
      
      // Tribes filter
      if (filters.tribes.length > 0 && !profile.tribes.some(t => filters.tribes.includes(t))) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Sort by distance, then online status
      if (a.isOnline !== b.isOnline) return a.isOnline ? -1 : 1;
      return (a.distance || 999) - (b.distance || 999);
    });
  }, [searchQuery, filters]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 60) count++;
    if (filters.distanceRadius !== 50) count++;
    if (filters.tribes.length > 0) count++;
    if (filters.lookingFor.length > 0) count++;
    if (filters.showOnlineOnly) count++;
    if (filters.showVerifiedOnly) count++;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search profiles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(true)}
            className="relative shrink-0"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>

        {/* Live Feed Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-3 text-sm text-muted-foreground"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>{filteredProfiles.filter(p => p.isOnline).length} online near you</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-1" />
        </motion.div>
      </header>

      {/* Profile Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProfiles.map((profile, index) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              index={index}
              isFavorited={favorites.includes(profile.id)}
              onFavorite={onToggleFavorite}
              onMessage={onStartChat}
              onClick={setSelectedProfile}
            />
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No profiles found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setFilters({
                ageRange: [18, 60],
                distanceRadius: 50,
                tribes: [],
                lookingFor: [],
                showOnlineOnly: false,
                showVerifiedOnly: false,
              })}
            >
              Reset Filters
            </Button>
          </motion.div>
        )}
      </div>

      {/* Filter Dialog */}
      <FilterDialog
        open={showFilters}
        onOpenChange={setShowFilters}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Profile Detail Sheet */}
      {selectedProfile && (
        <ProfileDetail
          profile={selectedProfile}
          open={!!selectedProfile}
          onOpenChange={(open) => !open && setSelectedProfile(null)}
          isFavorited={favorites.includes(selectedProfile.id)}
          onFavorite={onToggleFavorite}
          onMessage={onStartChat}
        />
      )}
    </div>
  );
}
