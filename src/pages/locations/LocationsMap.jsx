import React, { useState, useEffect, useMemo, useCallback } from "react";
import Map, { Source, Layer } from "react-map-gl";
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
        [0, "#2C272E"],  // Blackish Gray
        [1, "#753188"],  // Purple
        [2, "#E59934"],  // Orange
        [3, "#9AE66E"],  // Light Green
      ],
    },
    "fill-opacity": 0.8,
  },
};

export default function App() {
  const [allData, setAllData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);

  // Load GeoJSON data
  useEffect(() => {
    fetch("/data/states.geojson") // Correct path when using 'public' folder
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
    return allData && updatePercentiles(allData, (f) => f.properties.state_code); // Using 'state_code' for the demo
  }, [allData]);

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
