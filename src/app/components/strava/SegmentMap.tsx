"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";

// We dynamically import the entire component to prevent it from being rendered on the server.
// The ssr: false flag is crucial as it tells Next.js to skip this component during the build process.
const SegmentMap = dynamic(
  () =>
    import("react-leaflet").then(({ MapContainer, TileLayer, Polyline }) => {
      // This is the actual component that will render on the client
      return function InternalSegmentMap({ encoded }: { encoded: string }) {
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
      };
    }),
  { ssr: false }
);

export { SegmentMap };
