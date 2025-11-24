import type { IhlenRundtEventWithImages } from "@/types/ihlenrundt";

// Mock data for development - replace with database queries when ready
export const mockEvents: IhlenRundtEventWithImages[] = [
  {
    id: 3,
    year: 2026,
    date: "2026-09-06",
    title: "Ihlen Rundt 2026",
    description: "Lavterskelløp for alle! Et sosialt og uhøytidelig 4 km løp uten tidtaking – perfekt for både mosjonister og turgåere. Alle som deltar får medalje sponset av Askim & Spydeberg Sparebank.",
    participants_count: null,
    weather: null,
    highlights: null,
    created_at: "2026-01-01T10:00:00Z",
    updated_at: "2026-01-01T10:00:00Z",
    status: "upcoming",
    registration_url: "https://pameldinger.no/e/xgujhe",
    registration_deadline: "2026-09-06",
    distances: ["4 km (Ihlenrunden)", "500 m (barneløp)"],
    location: "Kiwi Hurrahølet, Askim",
    images: [
      {
        id: 8,
        event_id: 3,
        image_url: "/images/ihlenrundt2026/ihlenrundt_2026.jpg",
        caption: "Bli med på Ihlen Rundt 2026!",
        display_order: 1,
        created_at: "2026-01-01T10:00:00Z"
      }
    ]
  },
  {
    id: 1,
    year: 2025,
    date: "2025-09-07",
    title: "Ihlen Rundt 2025",
    description: "Et fantastisk arrangement med rekorddeltagelse! Perfekt vær og god stemning gjorde dette til en uforglemmelig dag for alle deltakere.",
    participants_count: 150,
    weather: "Overskyet og 18 grader",
    highlights: [
      "Rekorddeltagelse med 150 løpere",
      "Nytt barneløp for de minste",
      "Flott stemning og god mat",
      "Vellykket premiering"
    ],
    created_at: "2025-09-07T10:00:00Z",
    updated_at: "2025-09-07T10:00:00Z",
    status: "past",
    images: [
      {
        id: 1,
        event_id: 1,
        image_url: "/images/ihlenrundt2025/start_adultrun.jpg",
        caption: "Start av voksenløpet",
        display_order: 1,
        created_at: "2025-09-07T10:00:00Z"
      },
      {
        id: 2,
        event_id: 1,
        image_url: "/images/ihlenrundt2025/start_childrun.jpg",
        caption: "Start av barneløpet",
        display_order: 2,
        created_at: "2025-09-07T10:00:00Z"
      },
      {
        id: 3,
        event_id: 1,
        image_url: "/images/ihlenrundt2025/happy_runner.jpg",
        caption: "Fornøyde deltakere",
        display_order: 3,
        created_at: "2025-09-07T10:00:00Z"
      },
      {
        id: 4,
        event_id: 1,
        image_url: "/images/ihlenrundt2025/guys_finnished.jpg",
        caption: "I mål!",
        display_order: 4,
        created_at: "2025-09-07T10:00:00Z"
      },
      {
        id: 5,
        event_id: 1,
        image_url: "/images/ihlenrundt2025/start_adultrun_2.jpg",
        caption: "Deltakere på vei",
        display_order: 5,
        created_at: "2025-09-07T10:00:00Z"
      },
      {
        id: 6,
        event_id: 1,
        image_url: "/images/ihlenrundt2025/ihlen_runt.webp",
        caption: "Ihlen Rundt 2025",
        display_order: 6,
        created_at: "2025-09-07T10:00:00Z"
      }
    ]
  },

];

export const getUpcomingEvent = (): IhlenRundtEventWithImages | null => {
  return mockEvents.find(event => event.status === "upcoming") || null;
};

export const getPastEvents = (): IhlenRundtEventWithImages[] => {
  return mockEvents.filter(event => event.status === "past");
};
