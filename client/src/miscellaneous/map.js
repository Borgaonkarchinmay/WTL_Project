import React, { useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = '';

function Map() {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-122.4194);
  const [lat, setLat] = useState(37.7749);
  const [zoom, setZoom] = useState(11);
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  const registerRoute = () => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add the MapboxGeocoder to the map
    const sourceGeocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      countries : 'in'
    });

    const destinationGeocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      countries : 'in'
    });

    map.addControl(sourceGeocoder);
    map.addControl(destinationGeocoder);

    sourceGeocoder.on('result', (event) => {
      setSource([event.result.geometry.coordinates[0], event.result.geometry.coordinates[1]]);
      console.log(`soruce result: ${source}`);
    });

    destinationGeocoder.on('result', (event) => {
      setDestination([event.result.geometry.coordinates[0], event.result.geometry.coordinates[1]]);
      console.log(`destination result: ${destination}`);
    });

    return () => map.remove();
  };

  return <div ref={mapContainer} style={{ height: '38vh' , width : '40vh'}} />;
}

export default Map;
