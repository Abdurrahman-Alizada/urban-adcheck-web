// components/UserLocationIframe.js
'use client'
import { useEffect, useState } from "react";

const UserLocationIframe = () => {
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setIframeSrc(
            `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${lat},${lng}&zoom=14`
          );
        },
        (error) => console.error("Error getting location", error)
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  if (!iframeSrc) return <div>Fetching location...</div>;

  return (
    <iframe
      src={iframeSrc}
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  );
};

export default UserLocationIframe;
