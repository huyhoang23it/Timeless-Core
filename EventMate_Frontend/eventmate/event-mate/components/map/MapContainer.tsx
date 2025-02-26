// import React, { useEffect, useRef, useState } from 'react';  
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';  

// // Define types for hotel data  
// interface Hotel {  
//   place_id: string;  
//   name: string;  
//   geometry: {  
//     location: {  
//       lat: number; // Change to number for directly accessing the value  
//       lng: number; // Change to number for directly accessing the value  
//     };  
//   };  
// }  

// // Define type for Geocoding API response  
// interface GeocodeResult {  
//   results: [  
//     {  
//       geometry: {  
//         location: {  
//           lat: number;  
//           lng: number;  
//         };  
//       };  
//     }  
//   ];  
// }  

// const mapContainerStyle: React.CSSProperties = {  
//   width: '70%',  
//   height: '400px',  
// };  

// const listContainerStyle: React.CSSProperties = {  
//   width: '30%',  
//   height: '400px',  
//   overflowY: 'scroll',  
//   border: '1px solid #ccc',  
//   padding: '10px',  
// };  

// const API_KEY = 'AIzaSyAhuvkbu8iQU3vptKQSbaHQNlTJv0ndTVw'; // Replace with your API key  

// const MapContainer: React.FC = () => {  
//   const [hotels, setHotels] = useState<Hotel[]>([]);  
//   const [selectedHotel, setSelectedHotel] = useState<string | null>(null);  
//   const [location, setLocation] = useState<string>('');  
//   const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 37.7749, lng: -122.4194 });  
//   const mapRef = useRef<google.maps.Map | null>(null);  

//   useEffect(() => {  
//     fetchHotels(center.lat, center.lng); // Fetch hotels when center changes  
//   }, [center]);  

//   const fetchHotels = async (lat: number, lng: number) => {  
//     const response = await fetch(`http://localhost:5000/api/hotels?lat=${lat}&lng=${lng}`);   
//     const data = await response.json();  
//     setHotels(data.results);  
//   };  

//   const onLoad = (map: google.maps.Map) => {  
//     mapRef.current = map;  
//   };  

//   const handleMarkerClick = (hotel: Hotel) => {  
//     setSelectedHotel(hotel.place_id);  
//     if (mapRef.current) {  
//       mapRef.current.panTo({  
//         lat: hotel.geometry.location.lat, // Use lat directly  
//         lng: hotel.geometry.location.lng, // Use lng directly  
//       });  
//     }  
//   };  

//   const goToLocation = async () => {  
//     if (location) {  
//       const response = await fetch(  
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${API_KEY}`  
//       );  
//       const data: GeocodeResult = await response.json();  
//       if (data.results.length > 0) {  
//         const { lat, lng } = data.results[0].geometry.location;  
//         setCenter({ lat, lng });  
//         setLocation(''); // Clear the input after fetching  
//       } else {  
//         alert('Location not found. Please try again.');  
//       }  
//     }  
//   };  

//   return (  
//     <div style={{ display: 'flex' }}>  
//       <div style={listContainerStyle}>  
//         <h2>Hotel List</h2>  
//         <input  
//           type="text"  
//           value={location}  
//           onChange={(e) => setLocation(e.target.value)}  
//           placeholder="Enter location name"  
//           style={{ width: '100%', padding: '5px', marginBottom: '10px' }}  
//         />  
//         <button onClick={goToLocation} style={{ width: '100%', padding: '5px', marginBottom: '10px' }}>  
//           Search  
//         </button>  
//         <ul>  
//           {hotels.map((hotel) => (  
//             <li  
//               key={hotel.place_id}  
//               onClick={() => handleMarkerClick(hotel)}  
//               style={{ cursor: 'pointer', margin: '5px 0', padding: '5px', border: selectedHotel === hotel.place_id ? '1px solid blue' : '1px solid transparent' }}  
//             >  
//               {hotel.name}  
//             </li>  
//           ))}  
//         </ul>  
//       </div>  
      
//       <LoadScript googleMapsApiKey={API_KEY}>  
//         <GoogleMap  
//           onLoad={onLoad}  
//           mapContainerStyle={mapContainerStyle}  
//           center={center}  
//           zoom={14}  
//         >  
//           {hotels.map((hotel) => (  
//             <Marker  
//               key={hotel.place_id}  
//               position={{  
//                 lat: hotel.geometry.location.lat, // Use lat directly  
//                 lng: hotel.geometry.location.lng, // Use lng directly  
//               }}  
//               title={hotel.name}  
//               onClick={() => handleMarkerClick(hotel)}  
//               icon={{  
//                 url: selectedHotel === hotel.place_id ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"  
//               }}  
//             />  
//           ))}  
//         </GoogleMap>  
//       </LoadScript>  
//     </div>  
//   );  
// };  

// export default MapContainer;
import React, { useEffect, useRef, useState } from 'react';  
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';  

// Define types for hotel and restaurant data  
interface Place {  
  place_id: string;  
  name: string;  
  geometry: {  
    location: {  
      lat: number; // Access latitude directly  
      lng: number; // Access longitude directly  
    };  
  };  
}  

// Define type for Geocoding API response  
interface GeocodeResult {  
  results: [  
    {  
      geometry: {  
        location: {  
          lat: number;  
          lng: number;  
        };  
      };  
    }  
  ];  
}  

const mapContainerStyle: React.CSSProperties = {  
  width: '70%',  
  height: '400px',  
};  

const listContainerStyle: React.CSSProperties = {  
  width: '30%',  
  height: '400px',  
  overflowY: 'scroll',  
  border: '1px solid #ccc',  
  padding: '10px',  
};  

const API_KEY = 'AIzaSyAhuvkbu8iQU3vptKQSbaHQNlTJv0ndTVw'; // Replace with your API key  

const MapContainer: React.FC = () => {  
  const [hotels, setHotels] = useState<Place[]>([]);  
  const [restaurants, setRestaurants] = useState<Place[]>([]); // State for restaurants  
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);  
  const [location, setLocation] = useState<string>('');  
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 37.7749, lng: -122.4194 });  
  const mapRef = useRef<google.maps.Map | null>(null);  

  useEffect(() => {  
    fetchHotels(center.lat, center.lng);  
    fetchRestaurants(center.lat, center.lng); // Fetch restaurants when center changes  
  }, [center]);  

  const fetchHotels = async (lat: number, lng: number) => {  
    const response = await fetch(`http://localhost:5000/api/hotels?lat=${lat}&lng=${lng}`);  
    const data = await response.json();  
    setHotels(data.results);  
  };  

  const fetchRestaurants = async (lat: number, lng: number) => {  
    const response = await fetch(`http://localhost:5000/api/restaurants?lat=${lat}&lng=${lng}`); // Updated URL  
    const data = await response.json();  
    setRestaurants(data.results); // Update state with restaurant data  
  };  

  const onLoad = (map: google.maps.Map) => {  
    mapRef.current = map;  
  };  

  const handleMarkerClick = (place: Place) => {  
    setSelectedHotel(place.place_id);  
    if (mapRef.current) {  
      mapRef.current.panTo({  
        lat: place.geometry.location.lat, // Use lat directly  
        lng: place.geometry.location.lng, // Use lng directly  
      });  
    }  
  };  

  const goToLocation = async () => {  
    if (location) {  
      const response = await fetch(  
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${API_KEY}`  
      );  
      const data: GeocodeResult = await response.json();  
      if (data.results.length > 0) {  
        const { lat, lng } = data.results[0].geometry.location;  
        setCenter({ lat, lng });  
        setLocation(''); // Clear the input after fetching  
      } else {  
        alert('Location not found. Please try again.');  
      }  
    }  
  };  

  return (  
    <div style={{ display: 'flex' }}>  
      <div style={listContainerStyle}>  
        <div >  
          <h2>Hotel List</h2>  
          <input  
            type="text"  
            value={location}  
            onChange={(e) => setLocation(e.target.value)}  
            placeholder="Enter location name"  
            style={{ width: '100%', padding: '5px', marginBottom: '10px' }}  
          />  
          <button onClick={goToLocation} style={{ width: '100%', padding: '5px', marginBottom: '10px' }}>  
            Search  
          </button>  
          <ul>  
            {hotels.map((hotel) => (  
              <li  
                key={hotel.place_id}  
                onClick={() => handleMarkerClick(hotel)}  
                style={{ cursor: 'pointer', margin: '5px 0', padding: '5px', border: selectedHotel === hotel.place_id ? '1px solid blue' : '1px solid transparent' }}  
              >  
                {hotel.name}  
              </li>  
            ))}  
          </ul>  
        </div>  

        <div >  
          <h2>Restaurant List</h2>  
          <ul>  
            {restaurants.map((restaurant) => (  
              <li  
                key={restaurant.place_id}  
                onClick={() => handleMarkerClick(restaurant)} // Use the same marker click logic  
                style={{ cursor: 'pointer', margin: '5px 0', padding: '5px' }}  
              >  
                {restaurant.name}  
              </li>  
            ))}  
          </ul>  
        </div>  
      </div>  
      
      <LoadScript googleMapsApiKey={API_KEY}>  
        <GoogleMap  
          onLoad={onLoad}  
          mapContainerStyle={mapContainerStyle}  
          center={center}  
          zoom={14}  
        >  
          {hotels.map((hotel) => (  
            <Marker  
              key={hotel.place_id}  
              position={{  
                lat: hotel.geometry.location.lat, // Use lat directly  
                lng: hotel.geometry.location.lng, // Use lng directly  
              }}  
              title={hotel.name}  
              onClick={() => handleMarkerClick(hotel)}  
              icon={{  
                url: selectedHotel === hotel.place_id ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"  
              }}  
            />  
          ))}  
          {restaurants.map((restaurant) => (  
            <Marker  
              key={restaurant.place_id}  
              position={{  
                lat: restaurant.geometry.location.lat, // Use lat directly  
                lng: restaurant.geometry.location.lng, // Use lng directly  
              }}  
              title={restaurant.name}  
              icon={{  
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" // Different icon for restaurants  
              }}  
            />  
          ))}  
        </GoogleMap>  
      </LoadScript>  
    </div>  
  );  
};  

export default MapContainer;