"use client";

import { useEffect, useRef } from "react";

export default function MapPicker({ onSelect }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 9.9252, lng: 78.1198 }, // Madurai
        zoom: 13,
      });

      let marker;

      map.addListener("click", (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        if (marker) marker.setMap(null);

        marker = new window.google.maps.Marker({
          position: { lat, lng },
          map,
        });

        onSelect({ lat, lng });
      });
    };

    // 🔥 Load script dynamically
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "300px",
        borderRadius: "10px",
        marginTop: "10px",
      }}
    />
  );
};