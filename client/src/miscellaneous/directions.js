import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
//import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import "../Map.css"

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbm1heXBiIiwiYSI6ImNsZmphOTVkMDBoM2ozdnBuY3k3c2J3MjcifQ.Znb2DKQoYHqreA6cYDdYDA';

function Map() {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-122.4194);  
  const [lat, setLat] = useState(37.7749);
  const [zoom, setZoom] = useState(11);

  //const [coordinates, setCoordinates] = [];

  useEffect(() => {

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.on('load', () =>{
      var directions = new MapboxDirections({
        accessToken: 'pk.eyJ1IjoiY2hpbm1heXBiIiwiYSI6ImNsZmphOTVkMDBoM2ozdnBuY3k3c2J3MjcifQ.Znb2DKQoYHqreA6cYDdYDA',
        unit: 'metric',
  
        //api : 'https://api.mapbox.com/directions/v5/mapbox/driving/73.851341%2C18.457506%3B73.777826%2C18.660767?alternatives=true&language=en&overview=simplified',
        controls: {
          inputs: false,
          instructions: true,
          profileSwitcher: false
        },
        interactive: false,
        addWaypoints: true,
        waypoints: [],
      });
  
      
      // set origin and destination coordinates
      directions.setOrigin([73.777826,18.660767]);
      directions.setDestination([73.851341, 18.457506]);
      directions.addWaypoint(2, [73.783474,18.508022]);
      
      
      // Add the directions control to the map
      map.addControl(directions);
  

      // Get the route coordinates
      directions.on('route', (event) =>{
        const waypoints = directions.getWaypoints()
        console.log(`Distance: ${event.route[0].distance} Duration: ${event.route[0].duration}`);
        console.log(`Waypoints:  ${waypoints} `);
        // Do something with the coordinates
      });

    })
    
    return () => map.remove();

  });

  return <div ref={mapContainer} style={{ height: '90vh' , width : '86vh'}} />;
}

export default Map;
