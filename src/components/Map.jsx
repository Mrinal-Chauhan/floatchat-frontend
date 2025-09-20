import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const Map = () => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      // Initialize map
      mapInstance.current = L.map(mapContainer.current, {
        center: [20.5937, 78.9629], // ✅ Centered on India
        zoom: 3.5, // ✅ Zoom to fit India nicely
        scrollWheelZoom: false,
      });

      // Esri World Imagery (realistic colorful satellite map)
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
        {
          attribution: 'Tiles © <a href="https://www.esri.com/">Esri</a> — Source: Esri, Maxar, Earthstar Geographics',
          maxZoom: 20,
        }
      ).addTo(mapInstance.current);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return <div ref={mapContainer} className="map-container" />;
};

export default Map;

