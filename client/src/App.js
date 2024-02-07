import React from 'react'; 
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import Map from "./map"
//import Map from "./directions"
import { Registration } from './pages/registration';
import { Home } from './pages/home';
import {Login} from './pages/login';
import {UserRides} from './pages/userRides';
import {AvailableRides} from './pages/availableRides';
import {UserRideOffers} from './pages/offeredRides';
import {RideRequestsTrack} from './pages/rideRequestsTrack';
import {ProviderRideRequestInbox} from './pages/providerRideRequestInbox';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/home"  element = {<Home/>} />;
        <Route path = "/registration"  element = {<Registration/>} />;
        <Route path = "/"  element = {<Login/>} />;
        <Route path = "/rides"  element = {<UserRides/>} />;
        <Route path = "/rideOffers"  element = {<UserRideOffers/>} />;
        <Route path = "/trackRideRequests"  element = {<RideRequestsTrack/>} />;
        <Route path = "/availableRides/:src/:des/:time/:riderTitle/:riderRouteId"  element = {<AvailableRides/>} />;
        <Route path = "/providerRequestInbox"  element = {<ProviderRideRequestInbox/>} />;
      </Routes>
    </Router>
  );
}