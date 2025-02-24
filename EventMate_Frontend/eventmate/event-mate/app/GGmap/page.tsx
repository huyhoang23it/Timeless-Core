"use client";
import React from 'react';  
import MapContainer from '../../components/map/MapContainer'; // Adjust the path as necessary  

const App: React.FC = () => {  
  return (  
    <div>  
      <h1>Nearby Hotels</h1>  
      <MapContainer />  
    </div>  
  );  
};  

export default App;  