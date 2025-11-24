-- Migration: Create ihlenrundt_events table
-- Description: Stores information about past Ihlen Rundt events

CREATE TABLE IF NOT EXISTS ihlenrundt_events (
  id SERIAL PRIMARY KEY,
  year INTEGER NOT NULL UNIQUE,
  date DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  participants_count INTEGER,
  weather VARCHAR(100),
  highlights TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ihlenrundt_event_images (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES ihlenrundt_events(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO ihlenrundt_events (year, date, title, description, participants_count, weather, highlights) VALUES
(2024, '2024-09-07', 'Ihlen Rundt 2024', 'Et fantastisk arrangement med rekorddeltagelse!', 150, 'Solskinn og 18 grader', ARRAY['Rekorddeltagelse', 'Nytt barneløp', 'Flott stemning']),
(2023, '2023-09-07', 'Ihlen Rundt 2023', 'Vellykket arrangement med god oppslutning.', 120, 'Lett overskyet, 16 grader', ARRAY['God stemning', 'Mange nye deltakere', 'Vellykket premiering']);

-- Insert sample images
INSERT INTO ihlenrundt_event_images (event_id, image_url, caption, display_order) VALUES
(1, '/images/ihlenrundt_2026.jpg', 'Start av løpet 2024', 1),
(1, '/images/ihlen_runt.webp', 'Deltakere i aksjon', 2);
