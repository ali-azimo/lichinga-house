import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Autocomplete,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

// Coordenadas de Lichinga, Moçambique como centro padrão
const centerDefault = {
  lat: -13.3128,
  lng: 35.2406, // Lichinga, Moçambique
};

export default function MapMoz({ address }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'], // Usa 'places' para ativar o Autocomplete
  });

  const [coordinates, setCoordinates] = useState(null);
  const [open, setOpen] = useState(false);
  const [geoError, setGeoError] = useState(false);
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onAutocompleteLoad = (auto) => {
    setAutocomplete(auto);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCoordinates(newLocation);
        map.panTo(newLocation);
        // Aumenta o zoom quando seleciona um local
        map.setZoom(15);
      }
    }
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.status === 'OK') {
          const location = data.results[0].geometry.location;
          setCoordinates(location);
        } else {
          console.error('Erro na geocodificação:', data.status);
          setGeoError(true);
        }
      } catch (error) {
        console.error('Erro ao buscar coordenadas:', error);
        setGeoError(true);
      }
    };

    if (address) fetchCoordinates();
  }, [address]);

  if (loadError || geoError) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-8 p-8">
        <div className="text-red-500 text-center">
          Erro ao carregar o mapa. Por favor, tente novamente mais tarde.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-8 m-auto">
      {isLoaded && (
        <>
          <div className="p-4">
            <Autocomplete
              onLoad={onAutocompleteLoad}
              onPlaceChanged={onPlaceChanged}
              options={{
                componentRestrictions: { country: 'mz' }, // Restringe busca para Moçambique
                types: ['geocode', 'establishment'],
              }}
            >
              <input
                type="text"
                placeholder="Pesquisar localização em Lichinga ou outra cidade de Moçambique..."
                className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded shadow focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </Autocomplete>
            <p className="text-xs text-gray-500 mt-1">
              Digite o nome de um local em Moçambique (ex: Lichinga, Maputo, etc.)
            </p>
          </div>

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coordinates || centerDefault}
            zoom={coordinates ? 16 : 10} // Zoom maior para Lichinga
            onLoad={onLoad}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,
              mapTypeId: 'roadmap',
            }}
          >
            {coordinates && (
              <>
                <Marker
                  position={coordinates}
                  title="Local do Imóvel"
                  onClick={() => setOpen(true)}
                  animation={window.google?.maps?.Animation?.DROP}
                />
                {open && (
                  <InfoWindow
                    position={coordinates}
                    onCloseClick={() => setOpen(false)}
                  >
                    <div className="text-sm p-2">
                      <h3 className="font-semibold text-gray-800">📍 Localização do Imóvel</h3>
                      <p className="text-gray-600 mt-1 max-w-xs">{address}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Lichinga, Niassa - Moçambique
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </>
            )}
          </GoogleMap>

          {/* Informação adicional sobre Lichinga */}
          {!coordinates && (
            <div className="p-4 bg-blue-50 border-t border-blue-100">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">📍 Lichinga</span> - Capital da província de Niassa, 
                localizada no planalto de Lichinga, a aproximadamente 1.300 metros de altitude.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}