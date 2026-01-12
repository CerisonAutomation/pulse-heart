import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface PresenceState {
  [key: string]: {
    user_id: string;
    online_at: string;
    typing?: boolean;
  }[];
}

export const usePresence = (channelName: string) => {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel(channelName);

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState() as PresenceState;
        const users = Object.values(state)
          .flat()
          .filter((u) => u.user_id !== user.id);
        
        setOnlineUsers(users.map((u) => u.user_id));
        setTypingUsers(users.filter((u) => u.typing).map((u) => u.user_id));
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        const newUserIds = newPresences
          .filter((p: any) => p.user_id !== user.id)
          .map((p: any) => p.user_id);
        
        setOnlineUsers((prev) => [...new Set([...prev, ...newUserIds])]);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        const leftUserIds = leftPresences.map((p: any) => p.user_id);
        setOnlineUsers((prev) => prev.filter((id) => !leftUserIds.includes(id)));
        setTypingUsers((prev) => prev.filter((id) => !leftUserIds.includes(id)));
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: user.id,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, channelName]);

  const setTyping = async (isTyping: boolean) => {
    if (!user) return;

    const channel = supabase.channel(channelName);
    await channel.track({
      user_id: user.id,
      online_at: new Date().toISOString(),
      typing: isTyping,
    });
  };

  return {
    onlineUsers,
    typingUsers,
    setTyping,
    isUserOnline: (userId: string) => onlineUsers.includes(userId),
    isUserTyping: (userId: string) => typingUsers.includes(userId),
  };
};

export const useGlobalPresence = () => {
  return usePresence('global-presence');
};

export const useConversationPresence = (conversationId: string) => {
  return usePresence(`conversation-${conversationId}`);
};
