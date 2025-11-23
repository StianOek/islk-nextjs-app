-- Analytics table for tracking post views
CREATE TABLE IF NOT EXISTS post_views (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_post_views_post_id ON post_views(post_id);
CREATE INDEX IF NOT EXISTS idx_post_views_viewed_at ON post_views(viewed_at DESC);

-- View to get post view counts
CREATE OR REPLACE VIEW post_view_counts AS
SELECT 
  post_id,
  COUNT(*) as view_count,
  COUNT(DISTINCT DATE(viewed_at)) as unique_days
FROM post_views
GROUP BY post_id;
