import {Link} from 'react-router-dom';
import React , {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import './styles/style.css';  
import './styles/nav.css';

export const AppNavBar = ()=> {

 
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;

  useEffect(() =>{
    var userId = localStorage.getItem('userId');
    var email = localStorage.getItem('username');
    console.log(userId);
    if(userId){
      Axios.get(`http://localhost:8000/user/verify_login/${userId}/${email}`).then( (result) =>{
        if(!result.data.message){
          navigate('/');
        }    
      }).catch( (error) =>{
            alert('Oops, Something went wrong while logging you in. Try logging in again!!');
         })
    }else{
      navigate('/');
    }
  }, [navigate]);

  const logout = ()=> {
     localStorage.removeItem('userId');
     localStorage.removeItem('clientName');
     localStorage.removeItem('username');
     navigate('/');
  }

    return(
      <div className='topnav'>

        <a href>Welcome {localStorage.getItem('clientName')}!!</a>
        <a href="/home">Home</a>
        <a href="/rides">My Rides</a>
        <a href="/rideOffers">My Ride Offers</a>
        <a href="/trackRideRequests">Track Requested Rides</a>
        <a href="/providerRequestInbox">Ride Request Inbox</a>
       
        <div className='topnav-right'> <a onClick={logout}>Logout</a></div>
        <a href="javascript:void(0);" class="icon" onclick="myFunction()"> <i class="fa fa-bars"></i></a>

      </div>
    );
};