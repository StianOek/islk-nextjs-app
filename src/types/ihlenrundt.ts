export interface IhlenRundtEvent {
  id: number;
  year: number;
  date: string;
  title: string;
  description: string | null;
  participants_count: number | null;
  weather: string | null;
  highlights: string[] | null;
  created_at: string;
  updated_at: string;
  status?: "upcoming" | "past";
  registration_url?: string | null;
  registration_deadline?: string | null;
  distances?: string[] | null;
  location?: string | null;
}

export interface IhlenRundtEventImage {
  id: number;
  event_id: number;
  image_url: string;
  caption: string | null;
  display_order: number;
  created_at: string;
}

export interface IhlenRundtEventWithImages extends IhlenRundtEvent {
  images: IhlenRundtEventImage[];
}
