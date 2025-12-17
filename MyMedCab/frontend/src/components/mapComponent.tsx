import React, { useState, useEffect } from "react";
import * as mapboxgl from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const { Map, Marker, Popup } = mapboxgl;


const MAPBOX_TOKEN =
  "pk.eyJ1IjoibmllbHNvbjE5IiwiYSI6ImNtZ2xsZWxuNjE3ZWcydm9rZ29pb2ZrMnkifQ.bn7-2g_SeU7ny4WHI1UOPw";

interface MapComponentProps {
  className?: string;
  selectedCoords?: { lat: number; lng: number } | null;
  selectedPharmacy?: { name: string; stockLevel: number | null } | null;
}

function MapComponent({ className, selectedCoords, selectedPharmacy }: MapComponentProps) {
  //  default view: Miami, FL
  const [viewState, setViewState] = useState({
    longitude: -80.1918,   
    latitude: 25.7617,
    zoom: 11,
  });

  // controls whether the CVS popup is visible
  const [showSelectedPopup, setShowSelectedPopup] = useState(false);

  
  useEffect(() => {
    if (!selectedCoords) return;

    setViewState((prev) => ({
      ...prev,
      latitude: selectedCoords.lat,
      longitude: selectedCoords.lng,
      zoom: 13, 
    }));

    setShowSelectedPopup(true);
  }, [selectedCoords]);

  return (
    <div className={`${className ?? ""} relative`}>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {/* 🔵 Marker for the selected prescription's pharmacy */}
        {selectedCoords && (
          <Marker longitude={selectedCoords.lng} latitude={selectedCoords.lat}>
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: "#22c55e" }} // green dot for CVS
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                e.stopPropagation();
                setShowSelectedPopup(true);
              }}
            />
          </Marker>
        )}

        {/* 📍 Popup with CVS + stock level */}
        {selectedCoords && selectedPharmacy && showSelectedPopup && (
          <Popup
            longitude={selectedCoords.lng}
            latitude={selectedCoords.lat}
            anchor="top"
            onClose={() => setShowSelectedPopup(false)}
            closeButton
            closeOnClick={false}
          >
            <div className="p-2">
              <h3 className="font-bold text-sm">
                CVS Pharmacy, {selectedPharmacy.name}
              </h3>
              <p className="text-xs text-gray-600">
                Stock level: {selectedPharmacy.stockLevel ?? "N/A"}
              </p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default MapComponent;
