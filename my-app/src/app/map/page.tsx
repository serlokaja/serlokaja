"use client"

import { useState } from "react"
import MapComponent from "../components/map"

export default function Map(){

  const [loading,setLoading] = useState(true)
  const [address, setAddress] = useState("Jalan Citarum Raya No. 4, Depok")
  const [coordinates, setCoordinates] = useState({ lat: -6.1751, lon: 106.8650 });

  const handleMapClick = async (e: any) => {
    const { lat, lng } = e.latlng;
    setCoordinates({ lat, lon: lng });
      try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      console.log(data);
      
      if (data && data.lat) {
        setCoordinates({ lat: data.lat, lon: data.lon });
      } else {
        setCoordinates({ lat: 0, lon: 0 });
      }
    } catch (error) {
      console.error("Error fetching address: ", error);
      setAddress("Error fetching address");
    }
  };

  return (
    <>
    <MapComponent loading={loading} setLoading={setLoading} address={address} handleMapClick={handleMapClick} coordinates={coordinates} setCoordinates={setCoordinates}/>
    <form action="" method="post" className="flex flex-col">
      <label htmlFor="" className="text-black">Jalan</label>
      <input type="text" defaultValue={address} onChange={(e: any)=>setAddress(e.target.value)}/>
      <label htmlFor="" className="text-black">Coordinates</label>
      <input type="text" defaultValue={`${coordinates.lat}, ${coordinates.lon}`}/>
    </form>
    </>
  )
}