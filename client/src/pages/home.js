import React, { useRef, useState } from 'react';
import Axios from 'axios';
import mapboxgl from 'mapbox-gl';
import DateTimePicker from 'react-datetime-picker';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {AppNavBar} from '../components/appNavBar';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import './styles/Home.css';


mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbm1heXBiIiwiYSI6ImNsZmphOTVkMDBoM2ozdnBuY3k3c2J3MjcifQ.Znb2DKQoYHqreA6cYDdYDA';

export const Home = () =>{

  // Conditional render state
  const [rideRequest, setRideRequest] = useState(false);
  const [rideOffer, setRideOffer] = useState(false);
  const [requestOffer, setRequestOffer] = useState(true);
  

  // Map rendering
  const rideRequestMapContainer = useRef(null);
  const rideOfferMapContainer = useRef(null);
  

  // Ride request registration form
  const [rideTitle, setRideTitle] = useState('');
  const [rideTime, setRideTime] = useState('');
  const [rideRequestSource, setSource] = useState([]);
  const [rideRequestDestination, setDestination] = useState([]);
  const [rideOfferSource, setOfferSource] = useState([]);
  const [rideOfferDestination, setOfferDestination] = useState([]);
  const [viaPoint1, setViaPoint1] = useState([]);
  const [viaPoint2, setViaPoint2] = useState([]);


  // Ride Request functionality
  const registerRideRequest = async () =>{

    console.log('registerRideRequest');
    await setRideRequest(true);
    await setRequestOffer(false);
    await setRideOffer(false);

    const map = new mapboxgl.Map({
        container: rideRequestMapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [73.851341, 18.457506],
        zoom: 16
      });
    
      // Add the MapboxGeocoder to the map
      const sourceGeocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        countries : 'in',
        placeholder: 'Search Source'
      });
    
      const destinationGeocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          countries : 'in',
          placeholder: 'Search Destination'
      });
    
      map.addControl(sourceGeocoder);
      map.addControl(destinationGeocoder);
    
      sourceGeocoder.on('result', (event) => {
        setSource([...rideRequestSource, event.result.geometry.coordinates[0], event.result.geometry.coordinates[1]]);
      });
    
      destinationGeocoder.on('result', (event) => {
        setDestination([...rideRequestDestination, event.result.geometry.coordinates[0], event.result.geometry.coordinates[1]]);
      });
  }

  const registerRequest = () =>{
    console.log(rideTime);
    const uid = localStorage.getItem('userId');
    console.log(uid);
    Axios.post('http://localhost:8000/rideRequest/register', { 
      userId : uid,
      source : rideRequestSource,
      destination : rideRequestDestination,
      time : rideTime,
      title : rideTitle
    }).then( (response) =>{
        console.log(response.data);
        alert('Your ride request is registered successfully.');
      }).catch( (error) =>{
        console.log(error);
        alert('Your ride request was not registered, Something went wrong.');
      });
  }

  // Ride Offer functionality
  
  const registerRideOffer = async () =>{

    console.log('registerRideRequest');
    await setRideRequest(false);
    await setRequestOffer(false);
    await setRideOffer(true);

    const map = new mapboxgl.Map({
        container: rideOfferMapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [73.851341, 18.457506],
        zoom: 16
      });
    
      // Add the MapboxGeocoder to the map
      const sourceGeocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        countries : 'in',
        placeholder: 'Search Source'
      });
    
      const destinationGeocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          countries : 'in',
          placeholder: 'Search Destination'
      });

      const via1Geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          countries : 'in',
          placeholder: 'Via Point 1'
      });

    const via2Geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        countries : 'in',
        placeholder: 'Via Point 2'
    });
    
      map.addControl(sourceGeocoder);
      map.addControl(destinationGeocoder);
      map.addControl(via1Geocoder);
      map.addControl(via2Geocoder);
    
      sourceGeocoder.on('result', (event) => {
        setOfferSource([...rideOfferSource, event.result.geometry.coordinates[0], event.result.geometry.coordinates[1]]);
      });
    
      destinationGeocoder.on('result', (event) => {
        setOfferDestination([...rideOfferDestination, event.result.geometry.coordinates[0], event.result.geometry.coordinates[1]]);
      });

      via1Geocoder.on('result', (event) => {
        setViaPoint1([...viaPoint1, event.result.geometry.coordinates[0], event.result.geometry.coordinates[1]]);
      });

      via2Geocoder.on('result', (event) => {
        setViaPoint2([...viaPoint2, event.result.geometry.coordinates[0], event.result.geometry.coordinates[1]]);
      });
  }

  const registerOffer = () =>{
    const uid = localStorage.getItem('userId');
    var viaPoints = [viaPoint1, viaPoint2];

    Axios.post(`http://localhost:8000/provideRequest/register`, {
      userId : uid,
      source : rideOfferSource,
      destination : rideOfferDestination,
      time : rideTime,
      title : rideTitle,
      via_points : viaPoints
    }).then( (response) =>{
        console.log(response.data);
        alert('Your ride request is registered successfully.');
      }).catch( (error) =>{
        console.log(error);
        alert('Your ride request was not registered, Something went wrong.');
      });
  }
  
  return (  
    <div>
        <AppNavBar></AppNavBar>

        <div>
          { requestOffer &&
            <div>
              <div className='home-request-offer-btn'>
                <button className='home-ride-request-btn' onClick={ registerRideRequest }> Request Ride </button>
                <button className='home-ride-offer-btn' onClick={ registerRideOffer }> Offer Ride </button>
              </div>
            </div>
          }

          { rideRequest &&
            <div className = 'home-ride-offer-register'>
                <div ref={rideRequestMapContainer} style={{ height: '65vh' , width : '80vh'}} />

                <from className="form_section">
                  <div className='rapido_input_group'>
                    <label>Title of the route: </label>
                    <input type = "text" placeholder="Tile of route" onChange = { (e)=> {setRideTitle(e.target.value)} } />
                  </div>
                  <br></br>
                  <div>
                    <label>Date and time route: </label><br></br>
                    <DateTimePicker className='dateTime' onChange={(e) =>{setRideTime(e)}} value={rideTime} timeZone='Asia/Kolkata' disableClock = {true}  calendarIcon={null}/>
                  </div>

                  <div><button onClick={ registerRequest } className='yellow-btn btn'>Register Ride Request</button></div>
                </from>
            </div>
          }

          { rideOffer &&
            <div className = 'home-ride-offer-register'>
                <div ref={rideOfferMapContainer} style={{ height: '65vh' , width : '80vh'}} />

                <from className="form_section">
                  <div className='rapido_input_group'>
                    <label>Title of the route: </label>
                    <input type = "text" placeholder="Tile of route" onChange = { (e)=> {setRideTitle(e.target.value)} } />
                  </div>
                  <br></br>
                  <div>
                    <label>Date and time route: </label><br></br>
                    <DateTimePicker className='dateTime' onChange={(e) =>{setRideTime(e)}} value={rideTime} timeZone='Asia/Kolkata' disableClock = {true}  calendarIcon={null}/>
                  </div>

                  <div><button onClick={ registerOffer } className='yellow-btn btn'>Register Ride Offer</button></div>
                </from>
            </div>
          }

        </div>

    </div>
  );
}