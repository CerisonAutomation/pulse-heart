import { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomNav } from '@/components/ui/BottomNav';
import { ExploreTab } from '@/components/tabs/ExploreTab';
import { MessagesTab } from '@/components/tabs/MessagesTab';
import { FavoritesTab } from '@/components/tabs/FavoritesTab';
import { BookingsTab } from '@/components/tabs/BookingsTab';
import { ProfileTab } from '@/components/tabs/ProfileTab';
import { AIFloatingButton } from '@/components/AIFloatingButton';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const [searchParams] = useSearchParams();
  const { user, signOut } = useAuth();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { toast } = useToast();

  // Handle payment success/cancel from URL params
  useEffect(() => {
    const payment = searchParams.get('payment');
    if (payment === 'success') {
      toast({
        title: 'Payment Successful!',
        description: 'Your subscription is now active. Enjoy premium features!',
      });
    } else if (payment === 'cancelled') {
      toast({
        title: 'Payment Cancelled',
        description: 'Your subscription was not processed.',
        variant: 'destructive',
      });
    }
  }, [searchParams, toast]);

  const handleToggleFavorite = useCallback((profileUserId: string) => {
    toggleFavorite(profileUserId);
  }, [toggleFavorite]);

  const handleStartChat = useCallback((profileId: string) => {
    setActiveTab('messages');
    toast({
      title: "Opening chat",
      description: "Starting conversation...",
    });
  }, [toast]);

  const handleViewProfile = useCallback((profileId: string) => {
    setActiveTab('explore');
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case 'explore':
        return (
          <ExploreTab 
            favorites={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            onStartChat={handleStartChat}
          />
        );
      case 'messages':
        return (
          <MessagesTab 
            onViewProfile={handleViewProfile}
          />
        );
      case 'favorites':
        return (
          <FavoritesTab 
            favorites={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            onStartChat={handleStartChat}
            onViewProfile={handleViewProfile}
          />
        );
      case 'bookings':
        return (
          <BookingsTab 
            onViewProfile={handleViewProfile}
          />
        );
      case 'profile':
        return <ProfileTab onSignOut={signOut} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderTab()}
        </motion.div>
      </AnimatePresence>
      
      <AIFloatingButton />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default AppLayout;
