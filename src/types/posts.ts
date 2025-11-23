export interface Post {
  id: number;
  title: string;
  slug: string;
  published_at: string;
  image_url?: string;
  excerpt?: string;
  body: string;
  view_count?: number;
  author?: string;
}
