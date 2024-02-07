import React, {useEffect, useState} from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import '../App.css'

export const Login = ()=>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    
    Axios.defaults.withCredentials = true;

    useEffect(() =>{
      var userId = localStorage.getItem('userId');
      var email = localStorage.getItem('username');
      console.log(userId);
      if(userId){
        Axios.get(`http://localhost:8000/user/verify_login/${userId}/${email}`).then( (result) =>{
          if(result.data.message){
            navigate('/home');
          }    
        }).catch( (error) =>{
              alert('Try again to Log In or else check your credentials!!');
           })
      }
    }, [navigate]);
    
    const login = ()=>{
        Axios.post(`http://localhost:8000/user/login`, {
          email : email,
          password : password
        }).then( (result) =>{
          localStorage.setItem('userId', result.data.userId);
          localStorage.setItem('username', result.data.username);
          localStorage.setItem('clientName', result.data.name);
          alert('Logged In successfully');
          navigate('/home');
        }).catch( (error) =>{
          alert('Wrong Username and password combination.');
        })
    };

      
    return (
      <div className="App">
        <div className = "auth-form-container">
          <h1>Login</h1>  
            <from className="registration-form form_section">
              
              <div className='rapido_input_group'>
                <input type = "email" placeholder="Email" onChange = { (e)=> {setEmail(e.target.value)} } />
              </div>
  
              <div className='rapido_input_group'>
                <input type = "password" placeholder="Password" onChange = { (e)=> { setPassword(e.target.value)} } />
              </div>
  
              <div><button onClick={login} className='yellow-btn btn'>Log In</button></div>
  
            </from>
  
            <button className="btn"><Link to="/registration">Don't have an account? Sign Up here</Link></button>
        </div>
      </div>
    );
}
    