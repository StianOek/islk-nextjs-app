import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";

export function SegmentMap({ encoded }: { encoded: string }) {
  const points = polyline.decode(encoded); // [lat, lng][]

  if (!points.length) return null;

  return (
    <MapContainer
      bounds={points}
      style={{ width: "100%", height: "100%" }}
      className="rounded-xl"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={points} pathOptions={{ color: "#FC5200" }} />
    </MapContainer>
  );
}
