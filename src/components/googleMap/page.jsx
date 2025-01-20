'use client';
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

// Static fallback coordinates
const defaultCoordinates = {
  lat: 37.7749, // Latitude for San Francisco
  lng: -122.4194, // Longitude for San Francisco
};

const GoogleMapComponent = ({ address }) => {
  // Use dynamic coordinates if provided, otherwise default to static
  const coordinates = address?.coordinates
    ? { lat: address.coordinates[0], lng: address.coordinates[1] }
    : defaultCoordinates;

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyCxWXHmOKdGMLFUwz4bckMpuBLkY5c5Wj8">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinates}
          zoom={10}
        >
          <Marker position={coordinates} />
        </GoogleMap>
      </LoadScript>
      <span className="block">{coordinates.lat}</span>
      <span>{coordinates.lng}</span>
    </>
  );
};

export default GoogleMapComponent;
