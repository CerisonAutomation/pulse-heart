import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MoreVertical, BadgeCheck, Crown } from 'lucide-react';
import { Conversation } from '@/types';
import { mockConversations } from '@/data/mockData';
import { ChatWindow } from '@/components/ChatWindow';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface MessagesTabProps {
  onViewProfile: (profileId: string) => void;
}

export function MessagesTab({ onViewProfile }: MessagesTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const filteredConversations = mockConversations.filter((conv) =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: false });
  };

  return (
    <div className="min-h-screen pb-24">
      <AnimatePresence mode="wait">
        {selectedConversation ? (
          <ChatWindow
            key="chat"
            conversation={selectedConversation}
            onBack={() => setSelectedConversation(null)}
            onViewProfile={onViewProfile}
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <header className="sticky top-0 z-40 glass border-b border-border/50 px-4 py-4">
              <h1 className="text-2xl font-bold mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/50 border-border/50"
                />
              </div>
            </header>

            {/* Conversations List */}
            <div className="divide-y divide-border/50">
              {filteredConversations.map((conversation, index) => (
                <motion.button
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedConversation(conversation)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors text-left"
                >
                  {/* Avatar */}
                  <div className="relative">
                    <Avatar className="w-14 h-14 border-2 border-border">
                      <AvatarImage src={conversation.participant.avatar} />
                      <AvatarFallback>{conversation.participant.name[0]}</AvatarFallback>
                    </Avatar>
                    {conversation.participant.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-background" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold truncate">
                          {conversation.participant.name}
                        </span>
                        {conversation.participant.isVerified && (
                          <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
                        )}
                        {conversation.participant.isPremium && (
                          <Crown className="w-4 h-4 text-gold shrink-0" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {formatTime(conversation.updatedAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p className={cn(
                        "text-sm truncate",
                        conversation.unreadCount > 0 
                          ? "text-foreground font-medium" 
                          : "text-muted-foreground"
                      )}>
                        {conversation.lastMessage?.content}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Empty State */}
            {filteredConversations.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center px-4"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No conversations found</h3>
                <p className="text-muted-foreground mt-2">
                  Start a conversation from someone's profile
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
