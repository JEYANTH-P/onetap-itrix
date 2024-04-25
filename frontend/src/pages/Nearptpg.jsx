import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-knn';

const LeafletMap = () => {
  const mapRef = useRef();
  const knnRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
        console.log("Map Ref:", mapRef.current);
      const map = mapRef.current.leafletElement;
      knnRef.current = L.QuickKNN();

      // Example dataset of points
      const points = [
        [40.7128, -74.0060], // New York City
        [34.0522, -118.2437], // Los Angeles
        [51.5074, -0.1278], // London
        // Add more points as needed
      ];

      // Add points to KNN object
      knnRef.current.add(points);
    }
  }, [mapRef.current]);

  const handleMapClick = (e) => {
    const coordinates = [e.latlng.lat, e.latlng.lng];
    if (knnRef.current) {
      const nearestNeighbor = knnRef.current.nearest(coordinates);
      console.log("Nearest Neighbor:", nearestNeighbor);
      // You can update state or perform other actions with the nearest neighbor
    } else {
      console.error("KNN object is not initialized.");
    }
  };

  // Component to handle map click events
  const MapClickHandler = () => {
    const map = useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: '400px', width: '100%' }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
      <MapClickHandler />
    </MapContainer>
  );
};

export default LeafletMap;
