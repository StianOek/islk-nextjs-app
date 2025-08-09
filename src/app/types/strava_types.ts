export interface StravaSegment {
  id: number;
  resource_state: number;
  name: string;
  activity_type: string;
  distance: number;
  average_grade: number;
  maximum_grade: number;
  elevation_high: number;
  elevation_low: number;
  start_latlng: [number, number];
  end_latlng: [number, number];
  climb_category: number;
  city: string;
  state: string;
  country: string;
  private: boolean;
  hazardous: boolean;
  starred: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  total_elevation_gain: number;
  map: {
    id: string;
    polyline: string;
    resource_state: number;
  };
  effort_count: number;
  athlete_count: number;
  star_count: number;
  athlete_segment_stats: {
    pr_elapsed_time: number;
    pr_date: string; // ISO date string
    effort_count: number;
  };
  local_legend: {
    athlete_id: number;
    title: string;
    destination: string;
    effort_count: string;
    effort_counts: {
      overall: string;
      female: string;
    };
    effort_description: string;
    profile: string;
  };
}

export interface StravaClub {
  id: number;
  name: string;
  profile_medium: string;
  profile: string;
  cover_photo: string;
  cover_photo_small: string;
  sport_type: string;
  activity_types: string[];
  city: string;
  state: string;
  country: string;
  private: boolean;
  member_count: number;
  featured: boolean;
  verified: boolean;
  url: string;
  membership: string;
  admin: boolean;
  owner: boolean;
  description: string;
  club_type: string;
  post_count: number;
  owner_id: number;
  following_count: number;
}
