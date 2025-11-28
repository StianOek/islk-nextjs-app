import { NextResponse } from "next/server";
import { mockEvents } from "@/lib/ihlenrundt-data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Using mock data for now - replace with database query when ready
    const event = mockEvents.find(e => e.id === parseInt(id));
    
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching Ihlen Rundt event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}
