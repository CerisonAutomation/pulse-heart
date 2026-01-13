
-- Events System (replaces bookings for social activities)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL DEFAULT 'meetup',
  location TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  max_attendees INTEGER DEFAULT 10,
  is_public BOOLEAN DEFAULT true,
  is_premium_only BOOLEAN DEFAULT false,
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Event Attendees
CREATE TABLE IF NOT EXISTS public.event_attendees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Party Map for premium members
CREATE TABLE IF NOT EXISTS public.parties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  party_type TEXT NOT NULL DEFAULT 'private',
  location TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  max_guests INTEGER DEFAULT 20,
  dress_code TEXT,
  is_active BOOLEAN DEFAULT true,
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Party RSVPs
CREATE TABLE IF NOT EXISTS public.party_rsvps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  party_id UUID NOT NULL REFERENCES public.parties(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Meet Now locations (users sharing live location)
CREATE TABLE IF NOT EXISTS public.meet_now (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  message TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.party_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meet_now ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Anyone can view public events" ON public.events
  FOR SELECT USING (is_public = true OR host_id = auth.uid());

CREATE POLICY "Authenticated users can create events" ON public.events
  FOR INSERT WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update their events" ON public.events
  FOR UPDATE USING (auth.uid() = host_id);

CREATE POLICY "Hosts can delete their events" ON public.events
  FOR DELETE USING (auth.uid() = host_id);

-- Event attendees policies
CREATE POLICY "Users can view attendees of events they're part of" ON public.event_attendees
  FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM events e WHERE e.id = event_id AND e.host_id = auth.uid())
  );

CREATE POLICY "Users can join events" ON public.event_attendees
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their attendance" ON public.event_attendees
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can leave events" ON public.event_attendees
  FOR DELETE USING (auth.uid() = user_id);

-- Parties policies (premium feature)
CREATE POLICY "Users can view active parties" ON public.parties
  FOR SELECT USING (is_active = true OR host_id = auth.uid());

CREATE POLICY "Users can host parties" ON public.parties
  FOR INSERT WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update their parties" ON public.parties
  FOR UPDATE USING (auth.uid() = host_id);

CREATE POLICY "Hosts can delete their parties" ON public.parties
  FOR DELETE USING (auth.uid() = host_id);

-- Party RSVPs policies
CREATE POLICY "Hosts can view RSVPs" ON public.party_rsvps
  FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM parties p WHERE p.id = party_id AND p.host_id = auth.uid())
  );

CREATE POLICY "Users can RSVP to parties" ON public.party_rsvps
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users or hosts can update RSVPs" ON public.party_rsvps
  FOR UPDATE USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM parties p WHERE p.id = party_id AND p.host_id = auth.uid())
  );

-- Meet Now policies
CREATE POLICY "Anyone can view meet now users" ON public.meet_now
  FOR SELECT USING (true);

CREATE POLICY "Users can share their location" ON public.meet_now
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their location" ON public.meet_now
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can remove their location" ON public.meet_now
  FOR DELETE USING (auth.uid() = user_id);

-- Enable realtime for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_attendees;
ALTER PUBLICATION supabase_realtime ADD TABLE public.parties;
ALTER PUBLICATION supabase_realtime ADD TABLE public.meet_now;

-- Indexes for performance (without partial indexes using now())
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_host ON public.events(host_id);
CREATE INDEX IF NOT EXISTS idx_events_location ON public.events(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_parties_location ON public.parties(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_parties_active ON public.parties(is_active);
CREATE INDEX IF NOT EXISTS idx_meet_now_expires ON public.meet_now(expires_at);
CREATE INDEX IF NOT EXISTS idx_meet_now_location ON public.meet_now(latitude, longitude);
