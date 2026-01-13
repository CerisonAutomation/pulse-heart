-- PHASE 1: EU COMPLIANCE + VERIFICATION DATABASE SCHEMA

-- 1. Verification Requests Table
CREATE TABLE public.verification_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  verification_type TEXT NOT NULL CHECK (verification_type IN ('age', 'photo', 'id', 'video', 'phone')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired')),
  submitted_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  reviewer_id UUID,
  reviewer_notes TEXT,
  expires_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Verification Documents Table (auto-delete after review for GDPR)
CREATE TABLE public.verification_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.verification_requests(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('selfie', 'id_front', 'id_back', 'video', 'pose_photo')),
  storage_path TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- 3. GDPR Consent Records Table (audit trail)
CREATE TABLE public.gdpr_consent_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_type TEXT NOT NULL CHECK (consent_type IN ('essential_cookies', 'analytics_cookies', 'marketing_cookies', 'personalization_cookies', 'data_processing', 'age_verification', 'terms_of_service', 'privacy_policy')),
  consent_given BOOLEAN NOT NULL,
  ip_address INET,
  user_agent TEXT,
  consent_version TEXT DEFAULT '1.0',
  given_at TIMESTAMPTZ DEFAULT now(),
  withdrawn_at TIMESTAMPTZ
);

-- 4. GDPR Data Requests Table (export/deletion requests)
CREATE TABLE public.gdpr_data_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  request_type TEXT NOT NULL CHECK (request_type IN ('export', 'deletion', 'rectification', 'restriction')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected', 'cancelled')),
  requested_at TIMESTAMPTZ DEFAULT now(),
  processed_at TIMESTAMPTZ,
  processed_by UUID,
  notes TEXT,
  download_url TEXT,
  download_expires_at TIMESTAMPTZ,
  scheduled_deletion_at TIMESTAMPTZ
);

-- 5. Add verification columns to profiles table
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS date_of_birth DATE,
  ADD COLUMN IF NOT EXISTS age_verified BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS age_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS id_verified BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS id_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS photo_verified BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS photo_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS phone_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS gdpr_consent_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS data_processing_consent BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS account_deletion_requested_at TIMESTAMPTZ;

-- Enable RLS on all new tables
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gdpr_consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gdpr_data_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for verification_requests
CREATE POLICY "Users can view their own verification requests"
  ON public.verification_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own verification requests"
  ON public.verification_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their pending requests"
  ON public.verification_requests FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending');

-- RLS Policies for verification_documents
CREATE POLICY "Users can view their own documents"
  ON public.verification_documents FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.verification_requests vr 
    WHERE vr.id = verification_documents.request_id 
    AND vr.user_id = auth.uid()
  ));

CREATE POLICY "Users can upload their own documents"
  ON public.verification_documents FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.verification_requests vr 
    WHERE vr.id = verification_documents.request_id 
    AND vr.user_id = auth.uid()
  ));

-- RLS Policies for gdpr_consent_records
CREATE POLICY "Users can view their own consent records"
  ON public.gdpr_consent_records FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own consent records"
  ON public.gdpr_consent_records FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own consent records"
  ON public.gdpr_consent_records FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for gdpr_data_requests
CREATE POLICY "Users can view their own data requests"
  ON public.gdpr_data_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own data requests"
  ON public.gdpr_data_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their pending requests"
  ON public.gdpr_data_requests FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending');

-- Create private storage bucket for verification documents
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('verification-documents', 'verification-documents', false, 10485760)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for verification documents bucket
CREATE POLICY "Users can upload verification documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'verification-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own verification documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'verification-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own verification documents"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'verification-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Enable realtime for verification status updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.verification_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gdpr_data_requests;