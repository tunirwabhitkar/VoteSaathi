'use client';
import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/translations';

// IMPORTANT: libraries array must be a stable reference outside the component
const LIBRARIES: ("places")[] = ['places'];

const containerStyle = { width: '100%', height: '100%' };
const defaultCenter = { lat: 20.5937, lng: 78.9629 };

export default function MapSection() {
  const { language } = useAppStore();
  const t = translations[language];
  const [activeStation, setActiveStation] = useState<string | null>(null);
  const [stations, setStations] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const mapRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
    libraries: LIBRARIES,
  });

  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
    if (window.google?.maps) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
    geocoderRef.current = null;
  }, []);

  // Haversine distance calculation
  const calcDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lng2 - lng1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
  };

  // Use the NEW Places API (2025+) — google.maps.places.Place.searchNearby
  const searchNearbyBooths = async (latLng: { lat: number; lng: number }) => {
    setIsSearching(true);
    setStations([]);
    setSearchError('');

    try {
      const { Place } = await (window.google.maps.importLibrary('places') as any);

      const request = {
        fields: ['displayName', 'location', 'formattedAddress', 'id'],
        locationRestriction: {
          center: latLng,
          radius: 3000,
        },
        includedPrimaryTypes: ['school'],
        maxResultCount: 8,
      };

      const { places } = await Place.searchNearby(request);

      if (places && places.length > 0) {
        const formattedStations = places.map((place: any, index: number) => {
          const pLat = place.location?.lat() ?? 0;
          const pLng = place.location?.lng() ?? 0;
          return {
            id: place.id || `place-${index}`,
            name: place.displayName || 'Unknown Location',
            address: place.formattedAddress || '',
            lat: pLat,
            lng: pLng,
            distance: `${calcDistance(latLng.lat, latLng.lng, pLat, pLng)} km`,
            booth: `Booth No. ${index + 1}`,
          };
        });

        setStations(formattedStations);

        if (mapRef.current && formattedStations.length > 0) {
          const bounds = new window.google.maps.LatLngBounds();
          formattedStations.forEach((s: any) => bounds.extend({ lat: s.lat, lng: s.lng }));
          bounds.extend(latLng);
          mapRef.current.fitBounds(bounds);
        }
      } else {
        setSearchError('No polling stations found in this area. Try a different location.');
      }
    } catch (error: any) {
      console.error('Nearby search error:', error);
      setSearchError('Could not search this area. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Use Geocoder to convert address/PIN → lat/lng, then search nearby
  const handleSearch = () => {
    const query = searchValue.trim();
    if (!query || !geocoderRef.current) return;

    setSearchError('');

    geocoderRef.current.geocode(
      { address: query, componentRestrictions: { country: 'IN' } },
      (results: any, status: any) => {
        if (status === 'OK' && results?.[0]) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();

          setMapCenter({ lat, lng });
          setMapZoom(14);
          if (mapRef.current) {
            mapRef.current.panTo({ lat, lng });
            mapRef.current.setZoom(14);
          }
          searchNearbyBooths({ lat, lng });
        } else {
          setSearchError('Location not found. Please check the PIN code or area name.');
        }
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleStationClick = (station: any) => {
    setActiveStation(station.id);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: station.lat, lng: station.lng });
      mapRef.current.setZoom(16);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-b border-slate-200 bg-white relative z-20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t.mapTitle}</h2>
            <p className="text-sm text-slate-500 mt-1">{t.mapSubtitle}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Live Search
          </div>
        </div>
        
        <div className="relative max-w-md z-30 flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-slate-400">🔍</span>
            </div>
            <input
              type="text"
              disabled={!isLoaded}
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
              placeholder="Enter PIN code or Area (e.g. 110001)"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={!isLoaded || !searchValue.trim()}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            Search
          </button>
        </div>

        {searchError && (
          <p className="text-xs text-red-500 mt-2">{searchError}</p>
        )}
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden z-10">
        {/* List View */}
        <div className="w-full h-1/2 md:h-auto md:w-1/2 lg:w-2/5 overflow-y-auto p-4 space-y-3 bg-slate-50/50 flex-1 order-2 md:order-1">
          <AnimatePresence>
            {isSearching ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10 md:py-20 text-slate-500">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                 <p>Scanning area for potential booths...</p>
               </motion.div>
            ) : stations.length > 0 ? (
              stations.map((station, idx) => (
                <motion.div
                  key={station.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleStationClick(station)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    activeStation === station.id 
                      ? 'bg-blue-50 border-blue-300 shadow-md ring-1 ring-blue-500/20' 
                      : 'bg-white border-slate-200 shadow-sm hover:shadow hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 transition-colors ${
                      activeStation === station.id ? 'bg-blue-600 text-white shadow-inner' : 'bg-blue-100 text-blue-600'
                    }`}>
                      🏫
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold truncate ${activeStation === station.id ? 'text-blue-900' : 'text-slate-900'}`}>
                        {station.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 truncate">{station.address}</p>
                      <div className="flex items-center gap-2 mt-2.5">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider border border-emerald-200/50">
                          {station.distance}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider border border-slate-200">
                          {station.booth}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 md:py-20">
                <div className="text-4xl mb-3">🇮🇳</div>
                <h3 className="text-slate-900 font-semibold">Search All India</h3>
                <p className="text-sm text-slate-500 mt-1">Enter any PIN code or area name and press Search or Enter.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Google Map View */}
        <div className="w-full h-1/2 md:h-auto md:w-1/2 lg:w-3/5 relative bg-slate-200 overflow-hidden shrink-0 md:shrink order-1 md:order-2 border-b md:border-b-0 md:border-l border-slate-200">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={mapZoom}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
              }}
            >
              {stations.map((station) => (
                <Marker
                  key={station.id}
                  position={{ lat: station.lat, lng: station.lng }}
                  onClick={() => handleStationClick(station)}
                  animation={activeStation === station.id && window.google?.maps?.Animation ? window.google.maps.Animation.BOUNCE : undefined}
                >
                  {activeStation === station.id && (
                     <InfoWindow onCloseClick={() => setActiveStation(null)}>
                       <div className="p-1 max-w-[200px]">
                         <p className="font-bold text-sm mb-1">{station.name}</p>
                         <p className="text-xs text-slate-600 mb-2">{station.address}</p>
                         <span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded border border-blue-200">
                           {station.booth}
                         </span>
                       </div>
                     </InfoWindow>
                  )}
                </Marker>
              ))}
            </GoogleMap>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
