import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useRef, useEffect } from 'react';

const LIBRARIES = ['places'];

const Ubicacion = ({ value, onChange }) => {
  const [address, setAddress] = useState(value || '');
  const [center, setCenter] = useState({ lat: -34.6037, lng: -58.3816 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!scriptLoaded || !window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        fields: ['formatted_address', 'geometry'],
        types: ['establishment']
      }
    );

    const placeChangedListener = autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      const location = place.formatted_address;
      setAddress(location);
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
      setMarkerPosition({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
      onChange(location);
    });

    return () => {
      window.google.maps.event.removeListener(placeChangedListener);
    };
  }, [scriptLoaded, onChange]);

  const handleMapClick = (e) => {
    if (!window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: e.latLng.lat(), lng: e.latLng.lng() } },
      (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].formatted_address;
          setAddress(location);
          setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
          onChange(location);
        }
      }
    );
  };

  if (loadError) {
    return (
      <div className="error">
        Error al cargar Google Maps: {loadError}
        <br />
        Verifica tu conexión a internet y que la API Key sea correcta
      </div>
    );
  }

  return (
    <div className="location-picker">
      <LoadScript
        googleMapsApiKey="AIzaSyCksGGki7sjyE9YFsGVa7CClYRsCuuitIQ"
        libraries={LIBRARIES}
        onError={(err) => {
          console.error("Google Maps error:", err);
          setLoadError(err.message);
        }}
        onLoad={() => setScriptLoaded(true)}
      >
        {scriptLoaded && (
          <>
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar dirección del consultorio"
              className="form-input"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                onChange(e.target.value);
              }}
              required
            />

            <div style={{ marginTop: '10px', height: '300px', width: '100%' }}>
              <GoogleMap
                mapContainerStyle={{ height: '100%', width: '100%' }}
                center={center}
                zoom={15}
                onClick={handleMapClick}
              >
                {markerPosition && <Marker position={markerPosition} />}
              </GoogleMap>
            </div>
          </>
        )}
      </LoadScript>
    </div>
  );
};

export default Ubicacion;