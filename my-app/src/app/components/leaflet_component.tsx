import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// To fix the default icon issue with Webpack
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const LeafletMap = ({ coordinates, address, onMapClick }:{ coordinates: any, address: any, onMapClick:any }) => {
  return (
    <MapContainer center={[coordinates.lat, coordinates.lon]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[coordinates.lat, coordinates.lon]}>
        <Popup>
          {address}
        </Popup>
      </Marker>
      <MapEventsHandler onMapClick={onMapClick}/>
    </MapContainer>
  );
};

const MapEventsHandler = ({ onMapClick }:{onMapClick:any}) => {
  useMapEvents({
    click: onMapClick,
  });
  return null;
};

export default LeafletMap;
