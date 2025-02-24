import React, { useEffect, useRef, useState } from 'react';  
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';  

// Define types for hotel data  
interface Hotel {  
  place_id: string;  
  name: string;  
  geometry: {  
    location: {  
      lat: () => number;  
      lng: () => number;  
    };  
  };  
}  

const mapContainerStyle: React.CSSProperties = {  
  width: '100%',  
  height: '400px',  
};  

const center = {  
  lat: 37.7749, // Default latitude  
  lng: -122.4194, // Default longitude  
};  

const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key  

const MapContainer: React.FC = () => {  
  const [hotels, setHotels] = useState<Hotel[]>([]);  
  const mapRef = useRef<google.maps.Map | null>(null);  

  useEffect(() => {  
    const fetchHotels = async () => {  
      const response = await fetch(  
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=1500&type=lodging&key=${API_KEY}`  
      );  
      const data = await response.json();  
      setHotels(data.results);  
    };  

    fetchHotels();  
  }, []);  

  const onLoad = (map: google.maps.Map) => {  
    mapRef.current = map;  
  };  

  return (  
    // <LoadScript googleMapsApiKey={API_KEY}>  
    //   <GoogleMap  
    //     onLoad={onLoad}  
    //     mapContainerStyle={mapContainerStyle}  
    //     center={center}  
    //     zoom={14}  
    //   >  
    //     {hotels.map((hotel) => (  
    //       <Marker  
    //         key={hotel.place_id}  
    //         position={{  
    //           lat: hotel.geometry.location.lat(),  
    //           lng: hotel.geometry.location.lng(),  
    //         }}  
    //         title={hotel.name}  
    //       />  
    //     ))}  
    //   </GoogleMap>  
    // </LoadScript>  
    <h1>khiem dz</h1>
  );  
};  

export default MapContainer;