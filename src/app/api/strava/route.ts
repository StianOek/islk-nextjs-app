import { NextResponse } from "next/server";

let accessTokenCache: { token: string; expiresAt: number } | null = null;

async function getAccessToken() {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

  console.log("🔑 Env check", {
    clientId,
    clientSecret: !!clientSecret,
    refreshToken: !!refreshToken,
  });

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Strava API credentials in environment variables");
  }

  if (!accessTokenCache || accessTokenCache.expiresAt < Date.now() / 1000) {
    console.log("♻️ Refreshing Strava token...");

    const tokenRes = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const tokenText = await tokenRes.text();
    console.log(
      "📡 Token response:",
      tokenRes.status,
      tokenRes.statusText,
      tokenText
    );

    if (!tokenRes.ok) {
      throw new Error(`Token refresh failed: ${tokenText}`);
    }

    const tokenData = JSON.parse(tokenText);
    accessTokenCache = {
      token: tokenData.access_token,
      expiresAt: tokenData.expires_at,
    };
  }

  return accessTokenCache.token;
}

export async function GET() {
  try {
    console.log("🚀 Strava API route called");

    const accessToken = await getAccessToken();
    console.log("✅ Got access token:", accessToken ? "yes" : "no");

    const segmentIds = [
      process.env.STRAVA_SEGMENT_ID_1,
      process.env.STRAVA_SEGMENT_ID_2,
      process.env.STRAVA_SEGMENT_ID_3,
    ].filter(Boolean) as string[];

    console.log("📍 Segment IDs:", segmentIds);

    const segmentPromises = segmentIds.map(async (id) => {
      const res = await fetch(`https://www.strava.com/api/v3/segments/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const text = await res.text();
      console.log(`📡 Segment ${id} ->`, res.status, res.statusText, text);
      if (!res.ok) throw new Error(`Segment ${id} failed: ${text}`);
      return JSON.parse(text);
    });

    const segmentsData = await Promise.all(segmentPromises);

    let clubData = null;
    if (process.env.STRAVA_CLUB_ID) {
      const clubRes = await fetch(
        `https://www.strava.com/api/v3/clubs/${process.env.STRAVA_CLUB_ID}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const text = await clubRes.text();
      console.log(
        `📡 Club ${process.env.STRAVA_CLUB_ID} ->`,
        clubRes.status,
        clubRes.statusText,
        text
      );
      if (!clubRes.ok) throw new Error(`Club fetch failed: ${text}`);
      clubData = JSON.parse(text);
    }

    return NextResponse.json({ segments: segmentsData, club: clubData });
  } catch (err) {
    console.error("❌ API error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
