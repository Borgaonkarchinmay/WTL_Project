import React, {useState} from "react";
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import '../App.css'

export const Registration = ()=> {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  Axios.defaults.withCredentials = true;
  

  const register = ()=>{
    Axios.post('http://localhost:8000/user', { 
      name : name,
      phone : phone,
      department : department,
      year : year, 
      password : password,
      email : email,
      gender : gender
    }).then( (response) =>{
        console.log(response.data);
        // Save the credentials in local storage
        localStorage.setItem('username', email);
        localStorage.setItem('userId', response.data._id);
        localStorage.setItem('clientName', name);
        setIsLoggedIn(true);
        alert('You are successfully registered to RideEzy');
      }).catch( (error) =>{
        console.log(error);
        alert('You were\'nt registered successfully, Something went wrong');
      });
  };

  console.log(isLoggedIn);

  if(isLoggedIn){
    return <Navigate to='/home'></Navigate>
  }

  return (
    <div className="App">
      <div className = "auth-form-container">
        <h1>Registration</h1>  
          <from className="registration-form form_section">
            
            <div className='rapido_input_group'>
              <input type = "text" placeholder="Name" onChange = { (e)=> {setName(e.target.value)} } />
            </div>

            <div className='rapido_input_group'>
              <input type = "text" placeholder="Mobile No" onChange = { (e)=> {setPhone(e.target.value)} } />
            </div>

            <div className='rapido_input_group'>
              <select value={gender} onChange={(e) =>{setGender(e.target.value)}}>
                <option values = "">Select Gender</option>
                <option values = "female">female</option>
                <option values = "male">male</option>
                <option values = "other">other</option>
              </select>
            </div>

            <div className='rapido_input_group'>
              <input type = "email" placeholder="Email" onChange = { (e)=> {setEmail(e.target.value)} } />
            </div>

            <div className='rapido_input_group'>
              <input type = "password" placeholder="Password" onChange = { (e)=> {setPassword(e.target.value)} } />
            </div>

            <div className='rapido_input_group'>
              <input type = "text" placeholder="Department" onChange = { (e)=> {setDepartment(e.target.value)} } />
            </div>

            <div className='rapido_input_group'>
              <input type = "text" placeholder="Year" onChange = { (e)=> {setYear(e.target.value)} } />
            </div>                  

            <div><button onClick={register} className='yellow-btn btn'>Sign Up</button></div>

          </from>

        <button className="btn"> <Link to="/">Already have an account? Login here</Link></button>
      </div>
    </div>
  );
}