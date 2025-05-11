import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const LIBRARIES = ['places'];

const UbicacionViewer = ({ direccion }) => {
  const [center, setCenter] = useState({ lat: -34.6037, lng: -58.3816 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [geocodingError, setGeocodingError] = useState(null);
  const [isMapsApiLoaded, setIsMapsApiLoaded] = useState(false);

  useEffect(() => {
    if (scriptLoaded && direccion) {
      const geocoder = new window.google.maps.Geocoder();
      const timeout = setTimeout(() => {
        setGeocodingError('Tiempo de espera agotado para geolocalización');
      }, 10000); // Timeout después de 10 segundos

      geocoder.geocode({ address: direccion }, (results, status) => {
        clearTimeout(timeout);
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          const newCenter = { 
            lat: location.lat(), 
            lng: location.lng() 
          };
          setCenter(newCenter);
          setMarkerPosition(newCenter);
          setIsMapsApiLoaded(true);
        } else {
          console.error('Error en geocoding:', status);
          setGeocodingError(`Error al geolocalizar: ${status}`);
        }
      });
    }
  }, [scriptLoaded, direccion]);

  if (loadError || geocodingError) {
    return (
      <div className="error">
        {loadError || geocodingError}
        <div className="direccion-fallback">
          <strong>Dirección registrada:</strong> {direccion}
        </div>
      </div>
    );
  }

  return (
    <div className="ubicacion-viewer">
      <LoadScript
        googleMapsApiKey="AIzaSyCksGGki7sjyE9YFsGVa7CClYRsCuuitIQ"
        libraries={LIBRARIES}
        onError={(err) => setLoadError(err.message)}
        onLoad={() => setScriptLoaded(true)}
      >
        <div className='perfil-info-item'>
          <span>📍</span>
          <p>{direccion}</p>
        </div>

        {!isMapsApiLoaded ? (
          <div className="map-loading">
            Cargando mapa...
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div style={{ marginTop: '10px', height: '300px', width: '100%' }}>
            <GoogleMap
              mapContainerStyle={{ height: '100%', width: '100%' }}
              center={center}
              zoom={15}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
              }}
            >
              {markerPosition && <Marker position={markerPosition} />}
            </GoogleMap>
          </div>
        )}
      </LoadScript>

      <style jsx>{`
        .ubicacion-viewer {
          margin-bottom: 20px;
        }
        .direccion-display {
          padding: 12px;
          background: #f8f9fa;
          border-radius: 6px;
          margin-bottom: 15px;
          font-size: 0.9em;
        }
        .map-loading {
          height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          color: #6c757d;
          gap: 10px;
        }
        .loading-spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .error {
          color: #dc3545;
          padding: 15px;
          background: #f8d7da;
          border-radius: 6px;
          margin: 10px 0;
        }
        .direccion-fallback {
          margin-top: 10px;
          color: #212529;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
};
export default UbicacionViewer;