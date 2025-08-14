// utils/strava.ts
export type LatLng = [number, number];

/**
 * Decodes a Strava/Google encoded polyline into an array of [lat, lng]
 */
export function decodePolyline(encoded: string): LatLng[] {
  let index = 0,
    lat = 0,
    lng = 0;
  const coordinates: LatLng[] = [];

  while (index < encoded.length) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += deltaLng;

    coordinates.push([lat / 1e5, lng / 1e5]);
  }

  return coordinates;
}

/**
 * Formats meters to km string with 2 decimals
 */
export function formatKm(meters: number): string {
  return (meters / 1000).toFixed(2) + " km";
}

/**
 * Formats elevation meters
 */
export function formatMeters(meters: number): string {
  return `${meters.toFixed(0)} m`;
}
