import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useRef, useEffect } from 'react';
import { useGoogleMaps } from '../../context/GoogleMapsProvider';

const Ubicacion = ({ value, onChange }) => {
  const [address, setAddress] = useState(value || '');
  const [center, setCenter] = useState({ lat: -34.6037, lng: -58.3816 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [geocodingError, setGeocodingError] = useState(null);
  const { scriptLoaded, loadError } = useGoogleMaps();
  const inputRef = useRef(null);

  // Efecto para geocodificar el valor inicial
  useEffect(() => {
    if (scriptLoaded && value) {
      const geocoder = new window.google.maps.Geocoder();
      const timeout = setTimeout(() => {
        setGeocodingError('Tiempo de espera agotado para geolocalización');
      }, 10000);

      geocoder.geocode({ address: value }, (results, status) => {
        clearTimeout(timeout);
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          setCenter({
            lat: location.lat(),
            lng: location.lng()
          });
          setMarkerPosition({
            lat: location.lat(),
            lng: location.lng()
          });
        } else {
          console.error('Error en geocoding:', status);
          setGeocodingError(`Error al geolocalizar: ${status}`);
        }
      });
    }
  }, [scriptLoaded, value]);

  // Configurar autocomplete
  useEffect(() => {
    if (!scriptLoaded || !window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        fields: ['formatted_address', 'geometry'],
        types: ['address']
      }
    );

    const placeChangedListener = autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;
      
      const newAddress = place.formatted_address;
      setAddress(newAddress);
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
      setMarkerPosition({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
      onChange(newAddress);
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
          const newAddress = results[0].formatted_address;
          setAddress(newAddress);
          setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
          onChange(newAddress);
        }
      }
    );
  };

  if (loadError || geocodingError) {
    return (
      <div className="error">
        {loadError || geocodingError}
        <div className="direccion-fallback">
          <strong>Dirección registrada:</strong> {value}
        </div>
      </div>
    );
  }

  return (
    <div className="location-picker">
      {scriptLoaded ? (
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
              options={{
                gestureHandling: 'greedy',
                draggable: true,
                zoomControl: true
              }}
            >
              {markerPosition && <Marker position={markerPosition} />}
            </GoogleMap>
          </div>
        </>
      ) : (
        <div className="map-loading">
          Cargando Google Maps...
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Ubicacion;