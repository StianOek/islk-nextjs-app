// lib/strava.ts
let accessTokenCache: { token: string; expiresAt: number } | null = null;

export async function getAccessToken() {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Strava API credentials");
  }

  if (!accessTokenCache || accessTokenCache.expiresAt < Date.now() / 1000) {
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

    if (!tokenRes.ok) {
      throw new Error(`Token refresh failed: ${await tokenRes.text()}`);
    }

    const tokenData = await tokenRes.json();
    accessTokenCache = {
      token: tokenData.access_token,
      expiresAt: tokenData.expires_at,
    };
  }

  return accessTokenCache.token;
}
