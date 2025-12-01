-- Create event_settings table for editable content
CREATE TABLE public.event_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.event_settings ENABLE ROW LEVEL SECURITY;

-- Public can read all settings
CREATE POLICY "Anyone can view settings"
  ON public.event_settings
  FOR SELECT
  USING (true);

-- Only authenticated users can update settings
CREATE POLICY "Authenticated users can update settings"
  ON public.event_settings
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Only authenticated users can insert settings
CREATE POLICY "Authenticated users can insert settings"
  ON public.event_settings
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_event_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_event_settings_updated_at
  BEFORE UPDATE ON public.event_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_event_settings_updated_at();

-- Insert default settings
INSERT INTO public.event_settings (setting_key, setting_value) VALUES
  ('welcome', '{"title": "Malam Keajaiban", "subtitle": "The Miracle Night", "date": "31 Desember 2025", "description": "Bergabunglah bersama kami dalam perayaan malam yang penuh keanggunan, kemewahan, dan keajaiban"}'),
  ('countdown', '{"targetDate": "2025-12-31T19:00:00", "title": "Hitung Mundur", "subtitle": "Menuju Malam Penuh Keajaiban"}'),
  ('storytelling', '{"title": "Our Story", "subtitle": "Setiap momen adalah bagian dari cerita indah yang akan kita ciptakan bersama"}'),
  ('venue', '{"name": "Grand Ballroom Luxury Hotel", "address": "Jl. Sudirman No. 123, Jakarta Pusat", "mapUrl": "https://maps.google.com/?q=Grand+Ballroom+Jakarta"}'),
  ('timeline', '{"title": "Timeline Acara", "events": [{"time": "18:00", "title": "Registration", "description": "Penerimaan tamu & welcome drink"}, {"time": "19:00", "title": "Opening Ceremony", "description": "Pembukaan acara oleh MC"}, {"time": "19:30", "title": "Dinner", "description": "Makan malam prasmanan mewah"}, {"time": "21:00", "title": "Entertainment", "description": "Pertunjukan musik & hiburan"}, {"time": "23:00", "title": "Closing", "description": "Penutupan & photo session"}]}'),
  ('dresscode', '{"title": "Dress Code", "subtitle": "Black Tie / Formal Evening Attire", "description": "Kami mengundang Anda untuk tampil menawan dalam balutan busana formal terbaik Anda. Mari bersama-sama ciptakan suasana malam yang penuh keanggunan dan kemewahan."}'),
  ('rsvp', '{"title": "Konfirmasi Kehadiran", "subtitle": "Mohon konfirmasi kehadiran Anda", "description": "Kehadiran Anda sangat berarti bagi kami"}'),
  ('closing', '{"title": "Sampai Jumpa!", "subtitle": "Terima kasih atas perhatian Anda", "description": "Sampai bertemu di malam penuh keajaiban!"}');