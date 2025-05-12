// contexts/GoogleMapsContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';

const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({ children }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const LIBRARIES = ['places'];
  const API_KEY = 'AIzaSyCksGGki7sjyE9YFsGVa7CClYRsCuuitIQ';

  return (
    <GoogleMapsContext.Provider value={{ scriptLoaded, loadError }}>
      <LoadScript
        googleMapsApiKey={API_KEY}
        libraries={LIBRARIES}
        onError={(err) => {
          console.error("Google Maps error:", err);
          setLoadError(err.message);
        }}
        onLoad={() => setScriptLoaded(true)}
      >
        {children}
      </LoadScript>
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};