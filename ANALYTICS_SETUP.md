# Analytics Setup Guide

## Overview
Real view tracking has been implemented for your blog posts. This tracks every time someone views a blog post and displays the total count in your dashboard.

## Database Migration Required

You need to run the analytics migration to create the necessary database tables.

### Option 1: Using the migration script (Recommended)

```bash
node scripts/run-migration.js
```

### Option 2: Manual SQL execution

Connect to your PostgreSQL database and run the SQL from:
```
src/migrations/003_analytics.sql
```

You can do this via:
- pgAdmin
- psql command line
- Your database hosting dashboard (e.g., Vercel Postgres, Supabase)

Example using psql:
```bash
psql $DATABASE_URL -f src/migrations/003_analytics.sql
```

## What Was Created

### Database Tables

1. **post_views** - Tracks individual page views
   - `id`: Unique identifier
   - `post_id`: Reference to the blog post
   - `viewed_at`: Timestamp of the view
   - `ip_address`: Visitor's IP (for basic analytics)
   - `user_agent`: Browser information

2. **post_view_counts** (View) - Aggregated view counts per post
   - `post_id`: Post identifier
   - `view_count`: Total number of views
   - `unique_days`: Number of unique days with views

### API Endpoints

- **POST /api/posts/[slug]/view** - Tracks a view for a blog post
  - Called automatically when someone reads a post for 3+ seconds
  - Stores IP and user agent for basic analytics

### Features

- ✅ Real-time view tracking
- ✅ 3-second delay before counting (avoids counting quick bounces)
- ✅ Dashboard shows total views across all posts
- ✅ Individual view count on each blog post (dashboard & public)
- ✅ View count displayed on blog listing pages
- ✅ View count shown on individual blog post pages
- ✅ IP and user agent tracking for future analytics
- ✅ Automatic cleanup when posts are deleted (CASCADE)

## How It Works

1. User visits a blog post at `/blog/[slug]`
2. After 3 seconds, a POST request is sent to `/api/posts/[slug]/view`
3. The view is recorded in the `post_views` table
4. Dashboard queries the total count and displays it

## Privacy Note

The system tracks:
- IP addresses (anonymized/hashed recommended for GDPR compliance)
- User agents (browser information)
- Timestamps

Consider adding a privacy policy if you're in the EU/EEA.

## Future Enhancements

You can extend this system to track:
- Views per post (individual post analytics)
- Unique visitors (using IP hashing)
- Geographic data
- Referrer sources
- Time spent on page
- Popular posts widget

## Troubleshooting

**Views not tracking?**
- Check browser console for errors
- Verify the migration ran successfully
- Check database connection in API route

**Dashboard showing 0 views?**
- Visit a blog post and wait 3 seconds
- Refresh the dashboard
- Check the `post_views` table has data

**Migration fails?**
- Ensure DATABASE_URL environment variable is set
- Check database connection permissions
- Verify PostgreSQL version (9.5+)
