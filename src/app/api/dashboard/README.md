# Dashboard API Endpoints

## GET /api/dashboard/stats

Returns dashboard statistics including post counts, events, views, and growth metrics.

**Response:**
```json
{
  "totalPosts": 12,
  "totalEvents": 0,
  "totalViews": 504,
  "publishedThisMonth": 3,
  "growthPercentage": 25
}
```

## GET /api/dashboard/activity

Returns recent activity feed with the latest posts and events.

**Response:**
```json
[
  {
    "id": "post-123",
    "type": "post",
    "title": "New blog post published",
    "description": "\"Getting Started with Next.js\" was published successfully",
    "timestamp": "2024-01-15T10:30:00Z",
    "link": "/dashboard/blog"
  }
]
```

## Authentication

Both endpoints require authentication. The user must have a valid session cookie.

## Database Tables

### Posts Table
- `id`: Serial primary key
- `title`: Post title
- `slug`: Unique URL slug
- `body`: Post content
- `excerpt`: Short description
- `image_url`: Optional featured image
- `user_id`: Reference to users table
- `published_at`: Publication timestamp
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp
