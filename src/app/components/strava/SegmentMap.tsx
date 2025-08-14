"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

// Custom hook to invalidate the map size on component mount.
// This is important for ensuring the map renders correctly in a dynamically sized container.
const MapResizeHook = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
};

const SegmentMap = dynamic(
  () =>
    import("react-leaflet").then(({ MapContainer, TileLayer, Polyline }) => {
      return function InternalSegmentMap({ encoded }: { encoded: string }) {
        const points = polyline.decode(encoded); // [lat, lng][]

        if (!points.length) return null;

        return (
          <MapContainer
            bounds={points}
            style={{ width: "100%", height: "200px" }}
            className="rounded-xl z-10"
            boundsOptions={{ padding: [50, 50] }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Polyline positions={points} pathOptions={{ color: "#FC5200" }} />
            <MapResizeHook /> {/* Add this hook to handle resizing */}
          </MapContainer>
        );
      };
    }),
  { ssr: false }
);

export { SegmentMap };
