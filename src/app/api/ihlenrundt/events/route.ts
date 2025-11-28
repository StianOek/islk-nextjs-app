import { NextResponse } from "next/server";
import { mockEvents } from "@/lib/ihlenrundt-data";

export async function GET() {
  try {
    // Using mock data for now - replace with database query when ready
    // Uncomment below when database is set up:
    /*
    const events = await sql`
      SELECT 
        e.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', i.id,
              'event_id', i.event_id,
              'image_url', i.image_url,
              'caption', i.caption,
              'display_order', i.display_order,
              'created_at', i.created_at
            ) ORDER BY i.display_order
          ) FILTER (WHERE i.id IS NOT NULL),
          '[]'
        ) as images
      FROM ihlenrundt_events e
      LEFT JOIN ihlenrundt_event_images i ON e.id = i.event_id
      GROUP BY e.id
      ORDER BY e.year DESC
    `;
    */
    
    return NextResponse.json(mockEvents);
  } catch (error) {
    console.error("Error fetching Ihlen Rundt events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
