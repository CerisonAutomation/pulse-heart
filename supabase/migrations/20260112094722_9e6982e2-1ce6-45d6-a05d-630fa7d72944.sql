-- Message Reactions table
CREATE TABLE public.message_reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE NOT NULL,
    user_id UUID NOT NULL,
    emoji TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(message_id, user_id, emoji)
);

ALTER TABLE public.message_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view reactions in their conversations"
ON public.message_reactions FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.messages m
        JOIN public.conversations c ON m.conversation_id = c.id
        WHERE m.id = message_reactions.message_id
        AND (c.participant_one = auth.uid() OR c.participant_two = auth.uid())
    )
);

CREATE POLICY "Users can add reactions to messages in their conversations"
ON public.message_reactions FOR INSERT
WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
        SELECT 1 FROM public.messages m
        JOIN public.conversations c ON m.conversation_id = c.id
        WHERE m.id = message_reactions.message_id
        AND (c.participant_one = auth.uid() OR c.participant_two = auth.uid())
    )
);

CREATE POLICY "Users can remove their own reactions"
ON public.message_reactions FOR DELETE
USING (auth.uid() = user_id);

-- Photo Albums table
CREATE TABLE public.albums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    cover_url TEXT,
    is_private BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public albums"
ON public.albums FOR SELECT
USING (is_private = false OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own albums"
ON public.albums FOR ALL
USING (auth.uid() = user_id);

-- Album Photos table
CREATE TABLE public.album_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    album_id UUID REFERENCES public.albums(id) ON DELETE CASCADE NOT NULL,
    user_id UUID NOT NULL,
    url TEXT NOT NULL,
    caption TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.album_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view photos in accessible albums"
ON public.album_photos FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.albums a
        WHERE a.id = album_photos.album_id
        AND (a.is_private = false OR a.user_id = auth.uid())
    )
);

CREATE POLICY "Users can manage photos in their albums"
ON public.album_photos FOR ALL
USING (auth.uid() = user_id);

-- Push Subscriptions table
CREATE TABLE public.push_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    endpoint TEXT NOT NULL,
    p256dh TEXT NOT NULL,
    auth_key TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, endpoint)
);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own push subscriptions"
ON public.push_subscriptions FOR ALL
USING (auth.uid() = user_id);

-- User Subscriptions (Stripe) table
CREATE TABLE public.user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    plan_id TEXT NOT NULL DEFAULT 'free',
    status TEXT NOT NULL DEFAULT 'active',
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription"
ON public.user_subscriptions FOR SELECT
USING (auth.uid() = user_id);

-- Profile Photos (multiple photos per profile)
CREATE TABLE public.profile_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profile_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profile photos"
ON public.profile_photos FOR SELECT
USING (true);

CREATE POLICY "Users can manage their own photos"
ON public.profile_photos FOR ALL
USING (auth.uid() = user_id);

-- Blocks table
CREATE TABLE public.blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blocker_id UUID NOT NULL,
    blocked_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(blocker_id, blocked_id)
);

ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their blocks"
ON public.blocks FOR ALL
USING (auth.uid() = blocker_id);

-- Reports table
CREATE TABLE public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID NOT NULL,
    reported_id UUID NOT NULL,
    reason TEXT NOT NULL,
    details TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create reports"
ON public.reports FOR INSERT
WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view their own reports"
ON public.reports FOR SELECT
USING (auth.uid() = reporter_id);

-- Profile Matches (mutual likes)
CREATE TABLE public.matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_one UUID NOT NULL,
    user_two UUID NOT NULL,
    matched_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_one, user_two)
);

ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their matches"
ON public.matches FOR SELECT
USING (auth.uid() = user_one OR auth.uid() = user_two);

-- Enable realtime for reactions and messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.message_reactions;

-- Trigger for updated_at on albums
CREATE TRIGGER update_albums_updated_at
BEFORE UPDATE ON public.albums
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Trigger for updated_at on subscriptions
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.user_subscriptions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Function to check for mutual match
CREATE OR REPLACE FUNCTION public.check_mutual_match()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Check if the other person also favorited this user
    IF EXISTS (
        SELECT 1 FROM public.favorites
        WHERE user_id = NEW.favorited_user_id
        AND favorited_user_id = NEW.user_id
    ) THEN
        -- Create a match (order users consistently)
        INSERT INTO public.matches (user_one, user_two)
        VALUES (
            LEAST(NEW.user_id, NEW.favorited_user_id),
            GREATEST(NEW.user_id, NEW.favorited_user_id)
        )
        ON CONFLICT DO NOTHING;
        
        -- Create notification for both users
        INSERT INTO public.notifications (user_id, type, title, body, data)
        VALUES 
            (NEW.user_id, 'match', 'New Match! 👑', 'You matched with someone!', jsonb_build_object('matched_user_id', NEW.favorited_user_id)),
            (NEW.favorited_user_id, 'match', 'New Match! 👑', 'You matched with someone!', jsonb_build_object('matched_user_id', NEW.user_id));
    END IF;
    
    RETURN NEW;
END;
$$;

-- Trigger for checking matches
CREATE TRIGGER on_favorite_check_match
AFTER INSERT ON public.favorites
FOR EACH ROW EXECUTE FUNCTION public.check_mutual_match();