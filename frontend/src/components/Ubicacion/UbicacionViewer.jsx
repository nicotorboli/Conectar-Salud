import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import { useGoogleMaps } from '../../context/GoogleMapsProvider'; // Ajusta la ruta según tu estructura

const UbicacionViewer = ({ direccion }) => {
  const { scriptLoaded, loadError } = useGoogleMaps(); // Usamos el contexto
  const [center, setCenter] = useState({ lat: -34.6037, lng: -58.3816 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [loading, setLoading] = useState(true);

  // Geocodificación cuando cambia la dirección o se carga el script
  useEffect(() => {
    if (!scriptLoaded || !direccion) return;

    const geocoder = new window.google.maps.Geocoder();
    setLoading(true);
    
    geocoder.geocode({ address: direccion }, (results, status) => {
      setLoading(false);
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        const newCenter = { 
          lat: location.lat(), 
          lng: location.lng() 
        };
        setCenter(newCenter);
        setMarkerPosition(newCenter);
      } else {
        console.error('Geocoding error:', status);
      }
    });
  }, [scriptLoaded, direccion]);

  if (loadError) {
    return (
      <div className="error">
        Error al cargar Google Maps: {loadError}
        <div className="direccion-fallback">
          <strong>Dirección registrada:</strong> {direccion}
        </div>
      </div>
    );
  }

  return (
    <div className="ubicacion-viewer">
      <div className='perfil-info-item'>
        <span>📍</span>
        <p>{direccion}</p>
      </div>

      {!scriptLoaded || loading ? (
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
              gestureHandling: 'cooperative'
            }}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        </div>
      )}

      <style jsx>{`
        .ubicacion-viewer {
          margin-bottom: 20px;
        }
        .perfil-info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          font-size: 0.9rem;
        }
        .perfil-info-item span {
          font-size: 1.2em;
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