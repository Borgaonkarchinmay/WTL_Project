import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import "../Map.css";

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbm1heXBiIiwiYSI6ImNsZmphOTVkMDBoM2ozdnBuY3k3c2J3MjcifQ.Znb2DKQoYHqreA6cYDdYDA';

export const RideInsight = ({providerSrc, providerDes, viaPoints, riderSrc, riderDes}) =>{

    const mapContainer = useRef(null);

    useEffect( () => {

        const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [73.851341, 18.457506],
        zoom: 13
        });

        map.on('load', () =>{
            var directions = new MapboxDirections({
                accessToken: 'pk.eyJ1IjoiY2hpbm1heXBiIiwiYSI6ImNsZmphOTVkMDBoM2ozdnBuY3k3c2J3MjcifQ.Znb2DKQoYHqreA6cYDdYDA',
                unit: 'metric',
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
            directions.setOrigin([parseFloat(providerSrc[0]).toFixed(6), parseFloat(providerSrc[1]).toFixed(6)]);
            directions.setDestination([parseFloat(providerDes[0]).toFixed(6), parseFloat(providerDes[1]).toFixed(6)]);
            
            // Add Provider's via_points      
            var waypointIndex = 2;
            
            if(viaPoints[1].length === 2 && viaPoints[0].length === 2){
                directions.addWaypoint(waypointIndex, [parseFloat(viaPoints[0][0]).toFixed(6), parseFloat(viaPoints[0][1]).toFixed(6)]);
                waypointIndex = waypointIndex + 1;
                directions.addWaypoint(waypointIndex, [parseFloat(viaPoints[1][0]).toFixed(6), parseFloat(viaPoints[1][1]).toFixed(6)]);
                waypointIndex = waypointIndex + 1;
            }else if(viaPoints[0].length === 2){
                directions.addWaypoint(waypointIndex, [parseFloat(viaPoints[0][0]).toFixed(6), parseFloat(viaPoints[0][1]).toFixed(6)]);
                waypointIndex = waypointIndex + 1;
            }else if(viaPoints[1].length === 2){
                directions.addWaypoint(waypointIndex, [parseFloat(viaPoints[1][0]).toFixed(6), parseFloat(viaPoints[1][1]).toFixed(6)]);
                waypointIndex = waypointIndex + 1;
            }


            // Merge rider and provider's routes
            directions.addWaypoint(waypointIndex, [riderSrc[0], riderSrc[1]]);
            waypointIndex = waypointIndex + 1;
            console.log('now waypoint index: ' + waypointIndex);
            directions.addWaypoint(waypointIndex, [riderDes[0], riderDes[1]]);
            waypointIndex = waypointIndex + 1;
            

            //directions.addWaypoint(waypointIndex, [parseFloat(riderSource[0]).toFixed(6), parseFloat(riderDestination[1]).toFixed(6)]);

            // Add the directions control to the map
            map.addControl(directions);
        })
        
        return () => map.remove();

    });

    return <div ref={mapContainer} style={{ height: '70vh' , width : '95vh'}} />;
}
