import { getAccessToken } from "@/app/lib/strava";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const clubId = process.env.STRAVA_CLUB_ID;

    if (!clubId) throw new Error("No club ID provided");

    // Fetch club details
    const clubRes = await fetch(
      `https://www.strava.com/api/v3/clubs/${clubId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!clubRes.ok)
      throw new Error(`Club fetch failed: ${await clubRes.text()}`);
    const clubData = await clubRes.json();

    // Fetch recent club activities
    const activitiesRes = await fetch(
      `https://www.strava.com/api/v3/clubs/${clubId}/activities?page=1&per_page=10`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!activitiesRes.ok)
      throw new Error(`Activities fetch failed: ${await activitiesRes.text()}`);
    const activitiesData = await activitiesRes.json();

    return NextResponse.json({
      club: clubData,
      activities: activitiesData,
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
