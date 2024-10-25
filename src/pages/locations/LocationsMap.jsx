import React, { useState, useEffect, useMemo, useCallback } from "react";
import Map, { Source, Layer, Marker, Popup } from "react-map-gl";
import { scaleQuantile } from "d3-scale"; // Correct import for scaleQuantile
import { range } from "d3-array"; // Correct import for range

const MAPBOX_TOKEN = "pk.eyJ1IjoiYXZhcmdhczI3MDUiLCJhIjoiY20ybnVlemdlMDl5MjJrcHh1ZXl6ZGN3eiJ9.hYA6wc6kj5PJy8wWHTnDwg"; // Add your Mapbox token here

// Define the paint layer for fill colors using the final palette
const dataLayer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": {
      property: "percentile",
      stops: [
        [0, "#2C272E"], // Blackish Gray
        [1, "#753188"], // Purple
        [2, "#E59934"], // Orange
        [3, "#9AE66E"], // Light Green
      ],
    },
    "fill-opacity": 0.8,
  },
};

// Define the custom marker pin style
const Pin = ({ size = 20 }) => {
  const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
  
  const pinStyle = {
    cursor: 'pointer',
    fill: '#d00',
    stroke: 'none'
  };

  return (
    <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
      <path d={ICON} />
    </svg>
  );
};

// Example markers data
const markersData = [
  {
    id: "Mexico City",
    name: "Mexico City Dashboard",
    label: "Televisa",
    coordinates: [-99.1332, 19.4326],
    url: "/dashboard/mexico-city",
    image: "https://via.placeholder.com/150"
  },
  {
    id: "Leon",
    name: "Leon Dashboard",
    label: "Leon Power Center",
    coordinates: [-101.682, 21.1221],
    url: "/dashboard/leon",
    image: "https://via.placeholder.com/150"
  },
  {
    id: "Pachuca",
    name: "Pachuca Dashboard",
    label: "Pachuca Power",
    coordinates: [-98.7591, 20.1011],
    url: "/dashboard/pachuca",
    image: "https://via.placeholder.com/150"
  },
];

export default function App() {
  const [allData, setAllData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  // Load GeoJSON data
  useEffect(() => {
    fetch("/data/states.geojson") // Correct path to data folder in public directory
      .then((response) => response.json())
      .then((json) => setAllData(json))
      .catch((err) => console.error("Could not load data", err));
  }, []);

  const onHover = useCallback((event) => {
    const { features, point: { x, y } } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  // Process data to add percentile for color stops
  const data = useMemo(() => {
    return allData && updatePercentiles(allData, (f) => f.properties.state_code);
  }, [allData]);

  // Map the marker pins to the map
  const pins = useMemo(
    () =>
      markersData.map((marker, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={marker.coordinates[0]}
          latitude={marker.coordinates[1]}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(marker);
          }}
        >
          <Pin />
        </Marker>
      )),
    [markersData]
  );

  return (
    <>
      <Map
        initialViewState={{
          latitude: 19.4326,
          longitude: -99.1332,
          zoom: 5,
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onMouseMove={onHover}
      >
        {data && (
          <Source type="geojson" data={data}>
            <Layer {...dataLayer} />
          </Source>
        )}

        {hoverInfo && (
          <div className="tooltip" style={{ left: hoverInfo.x, top: hoverInfo.y }}>
            <div>State: {hoverInfo.feature.properties.state_name}</div>
            <div>State Code: {hoverInfo.feature.properties.state_code}</div>
          </div>
        )}

        {/* Add the markers to the map */}
        {pins}

        {/* Display a popup when clicking on a marker */}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.coordinates[0])}
            latitude={Number(popupInfo.coordinates[1])}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              <h4>{popupInfo.name}</h4>
              <p>
                <a href={popupInfo.url}>Visit Dashboard</a>
              </p>
              <img src={popupInfo.image} alt={popupInfo.name} width="100%" />
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
}

// Utility function to process the GeoJSON and add percentile properties
function updatePercentiles(featureCollection, accessor) {
  const { features } = featureCollection;
  const scale = scaleQuantile().domain(features.map(accessor)).range(range(4)); // 4 color stops to match the palette
  return {
    type: "FeatureCollection",
    features: features.map((f) => {
      const value = accessor(f);
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value), // Adds a percentile to each feature
      };
      return { ...f, properties };
    }),
  };
}
