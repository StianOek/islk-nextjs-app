import { getAccessToken } from "@/app/lib/strava";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const segmentIds = [
      process.env.STRAVA_SEGMENT_ID_1,
      process.env.STRAVA_SEGMENT_ID_2,
      process.env.STRAVA_SEGMENT_ID_3,
    ].filter(Boolean) as string[];

    const segmentPromises = segmentIds.map(async (id) => {
      const res = await fetch(`https://www.strava.com/api/v3/segments/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) throw new Error(`Segment ${id} failed: ${await res.text()}`);
      return res.json();
    });

    const segmentsData = await Promise.all(segmentPromises);

    return NextResponse.json({ segments: segmentsData });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
