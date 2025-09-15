import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css'; // We'll create this CSS file next

const Map = () => {
  // useRef stores the map instance and the map container element
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // This effect runs only once when the component mounts
    if (mapContainer.current && !mapInstance.current) {
      // Initialize the map
      mapInstance.current = L.map(mapContainer.current, {
        center: [20, 0], // Initial center coordinates (lat, lng)
        zoom: 2, // Initial zoom level
        scrollWheelZoom: false, // Optional: disable zoom on scroll
      });

      // Add a dark tile layer from CartoDB
      // This looks much better with our dark theme
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapInstance.current);

      // You can add markers or other layers here later
      // L.marker([51.5, -0.09]).addTo(mapInstance.current);
    }

    // Cleanup function to run when the component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return <div ref={mapContainer} className="map-container" />;
};

export default Map;