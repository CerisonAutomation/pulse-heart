import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, DollarSign, Check, X, 
  ChevronRight, Plus, Filter 
} from 'lucide-react';
import { Booking } from '@/types';
import { mockBookings } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface BookingsTabProps {
  onViewProfile: (profileId: string) => void;
}

export function BookingsTab({ onViewProfile }: BookingsTabProps) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const pendingBookings = mockBookings.filter(b => b.status === 'pending');
  const upcomingBookings = mockBookings.filter(b => b.status === 'confirmed');
  const pastBookings = mockBookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case 'confirmed': return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'completed': return 'bg-primary/10 text-primary border-primary/30';
      case 'cancelled': return 'bg-destructive/10 text-destructive border-destructive/30';
    }
  };

  const BookingCard = ({ booking, index }: { booking: Booking; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-4 rounded-2xl bg-card border border-border/50 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => booking.provider && onViewProfile(booking.provider.id)}
          className="flex items-center gap-3"
        >
          <Avatar className="w-12 h-12 border-2 border-border">
            <AvatarImage src={booking.provider?.avatar} />
            <AvatarFallback>{booking.provider?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="font-semibold">{booking.provider?.name}</p>
            <p className="text-sm text-muted-foreground">{booking.provider?.role === 'provider' ? 'Provider' : 'Seeker'}</p>
          </div>
        </button>
        <Badge variant="outline" className={cn("capitalize", getStatusColor(booking.status))}>
          {booking.status}
        </Badge>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{format(booking.date, 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{booking.startTime} - {booking.endTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground col-span-2">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{booking.location}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-5 h-5 text-gold" />
          <span className="text-lg font-bold text-gold">${booking.totalAmount}</span>
        </div>
        
        {booking.status === 'pending' && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30">
              <X className="w-4 h-4 mr-1" />
              Decline
            </Button>
            <Button size="sm" className="gradient-primary">
              <Check className="w-4 h-4 mr-1" />
              Accept
            </Button>
          </div>
        )}
        
        {booking.status === 'confirmed' && (
          <Button variant="outline" size="sm">
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Bookings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your appointments
            </p>
          </div>
          <Button size="icon" className="gradient-primary rounded-full">
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-secondary/50">
            <TabsTrigger value="pending" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Pending
              {pendingBookings.length > 0 && (
                <span className="ml-1.5 w-5 h-5 rounded-full bg-yellow-500 text-yellow-950 text-xs flex items-center justify-center">
                  {pendingBookings.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Past
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      {/* Content */}
      <div className="p-4 space-y-4">
        {activeTab === 'pending' && (
          <>
            {pendingBookings.length > 0 ? (
              pendingBookings.map((booking, index) => (
                <BookingCard key={booking.id} booking={booking} index={index} />
              ))
            ) : (
              <EmptyState message="No pending bookings" />
            )}
          </>
        )}

        {activeTab === 'upcoming' && (
          <>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking, index) => (
                <BookingCard key={booking.id} booking={booking} index={index} />
              ))
            ) : (
              <EmptyState message="No upcoming bookings" />
            )}
          </>
        )}

        {activeTab === 'past' && (
          <>
            {pastBookings.length > 0 ? (
              pastBookings.map((booking, index) => (
                <BookingCard key={booking.id} booking={booking} index={index} />
              ))
            ) : (
              <EmptyState message="No past bookings" />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Calendar className="w-8 h-8 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground">{message}</p>
    </motion.div>
  );
}
