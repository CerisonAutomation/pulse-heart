import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, Edit3, MapPin, Ruler, Calendar, Eye, Heart, Users, 
  Star, Crown, BadgeCheck, Camera, ChevronRight, LogOut, Shield, 
  Bell, CreditCard, HelpCircle 
} from 'lucide-react';
import { currentUserProfile, mockUserStats, TRIBES, LOOKING_FOR } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface ProfileTabProps {
  onSignOut?: () => void;
}

export function ProfileTab({ onSignOut }: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const profile = currentUserProfile;
  const stats = mockUserStats;

  const menuItems = [
    { icon: Bell, label: 'Notifications', badge: 3 },
    { icon: Shield, label: 'Privacy & Security' },
    { icon: CreditCard, label: 'Subscription', badge: 'PRO' },
    { icon: HelpCircle, label: 'Help & Support' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header with Gradient */}
      <div className="relative h-48 bg-gradient-to-br from-primary/30 via-accent/20 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        
        {/* Settings Button */}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="px-4 -mt-20">
        {/* Avatar */}
        <div className="relative inline-block">
          <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback className="text-3xl">{profile.name[0]}</AvatarFallback>
          </Avatar>
          <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
            <Camera className="w-5 h-5" />
          </button>
          {profile.isOnline && (
            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 border-4 border-background" />
          )}
        </div>

        {/* Name & Badges */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{profile.name}, {profile.age}</h1>
            {profile.isVerified && (
              <BadgeCheck className="w-6 h-6 text-primary" />
            )}
            {profile.isPremium && (
              <Crown className="w-6 h-6 text-gold" />
            )}
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
            <MapPin className="w-4 h-4" />
            <span>{profile.location}</span>
          </div>
        </div>

        {/* Edit Profile Button */}
        <Button 
          variant="outline" 
          className="mt-4 w-full"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-2 mt-6 p-4 rounded-2xl bg-card border border-border/50"
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-xl font-bold">{stats.views}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Views</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-xl font-bold">{stats.favorites}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Likes</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-xl font-bold">{stats.matches}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Matches</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 text-gold" />
              <span className="text-xl font-bold">{stats.rating}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Rating</p>
          </div>
        </motion.div>

        {/* Profile Completion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-4 p-4 rounded-2xl bg-card border border-border/50"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Profile Completion</span>
            <span className="text-sm text-primary font-semibold">75%</span>
          </div>
          <Progress value={75} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Add more photos to increase visibility
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 p-4 rounded-2xl bg-card border border-border/50"
        >
          <h3 className="font-semibold mb-2">About Me</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{profile.bio}</p>
        </motion.div>

        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-4 p-4 rounded-2xl bg-card border border-border/50"
        >
          <h3 className="font-semibold mb-3">Details</h3>
          <div className="grid grid-cols-2 gap-3">
            {profile.height && (
              <div className="flex items-center gap-2 text-sm">
                <Ruler className="w-4 h-4 text-muted-foreground" />
                <span>{profile.height}</span>
              </div>
            )}
            {profile.weight && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Weight:</span>
                <span>{profile.weight}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Tribes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 p-4 rounded-2xl bg-card border border-border/50"
        >
          <h3 className="font-semibold mb-3">My Tribes</h3>
          <div className="flex flex-wrap gap-2">
            {profile.tribes.map((tribe) => (
              <Badge key={tribe} variant="secondary" className="px-3 py-1">
                {tribe}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Looking For */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-4 p-4 rounded-2xl bg-card border border-border/50"
        >
          <h3 className="font-semibold mb-3">Looking For</h3>
          <div className="flex flex-wrap gap-2">
            {profile.lookingFor.map((item) => (
              <Badge key={item} className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20">
                {item}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 rounded-2xl bg-card border border-border/50 overflow-hidden"
        >
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors",
                index !== menuItems.length - 1 && "border-b border-border/50"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <Badge 
                    variant={typeof item.badge === 'string' ? 'default' : 'destructive'}
                    className={cn(
                      "text-xs",
                      typeof item.badge === 'string' && "bg-gold text-gold-foreground"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </motion.div>

        {/* Logout */}
        <Button 
          variant="ghost" 
          className="w-full mt-4 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={onSignOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground mt-4 mb-8">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
}
