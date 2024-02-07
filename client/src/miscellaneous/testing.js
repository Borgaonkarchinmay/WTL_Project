import React , {useEffect, useState} from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
//import Card from "@material-ui/core/Card";
//import './styles/table.css';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import {AppNavBar} from '../components/appNavBar';

export const ProviderRideRequestInbox = ()=> {

    //Necessary variables
    const [rideRequestInbox, setRideRequestInbox] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [riderDetails, setRiderDetails] = useState();
    //required methods

    const customModalStyles = {
        content: {
          width: '50%',
          height: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }
    };

    useEffect(() => {
        console.log('available rides page');
        var provider_id = localStorage.getItem('userId');
        console.log(provider_id);
        Axios.get(`http://localhost:8000/bridgeRequest/trackProviderRequest/${provider_id}`).then((response) => {
            setRideRequestInbox(response.data);
            console.log(response.data);
        });
    }, []);

    const AcceptRequest = (request_id, requester_id) =>{
        console.log('AcceptRequest');
        // Accept request
        
        // Fetch user details
        fetchRiderDetails(requester_id);
    }
    const RejectRequest = (request_id) =>{
        console.log('AcceptRequest');
    }
    const DoneRequest = (request_id) =>{
        console.log('AcceptRequest');
    }
    const fetchRiderDetails = (requester_id) =>{
        console.log('AcceptRequest');
        Axios.get(`http://localhost:8000/user/${requester_id}`).then((response) => {
            console.log(response.data);
            setRiderDetails(response.data);
            setIsOpen(true);
        }).catch( (error) =>{
            console.log(error);
        });
    }

    const closeModal = () =>{
        setIsOpen(false);
    }

    //Render page code

    const column_RequestInbox = [
        {
            name : 'Your Route Title',
            selector : (row) => row.provider_title
        },
        {
            name : 'Time',
            selector : (row) => row.time
        },
        {
            name : 'Ride Insight',
            cell : (row)=> (
                <Link to={`/rideInsight/${row.provider_source}/${row.provider_destination}/${row.provider_via_points}/${row.requester_source}/${row.requester_destination}`}>Ride insight</Link>
            )
        },
        {
            name : 'Status',
            selector : (row) => row.status
        },
        {
            name : 'Accept Ride',
            cell : (row)=> (
                <button onClick={ () => { AcceptRequest(row._id, row.requester_id) } }>Accept</button>
            )
        },
        {
            name : 'Reject Ride',
            cell : (row)=> (
                <button onClick={ () => { RejectRequest(row._id) } }>Reject</button>
            )
        },
        {
            name : 'Done This Ride',
            cell : (row)=> (
                <button onClick={ () => { DoneRequest(row._id) } }>Done</button>
            )
        },
        {
            name : 'Rider\'s Details',
            cell : (row)=> {
                    var isAccepted = false;
                    if(row.status === 'confirmed'){
                        isAccepted = true;
                    }
                    return (
                    <button onClick={ () => { fetchRiderDetails(row.requester_id) } } disabled={isAccepted} >View Rider</button>
                );
            }
        }
    ];

    //Render page code

    return (
        <div  className='bck' >
            <AppNavBar></AppNavBar>
            <br></br>
            <div >
                <div className='head'><h2>Ride Request Inbox</h2></div>
                <div className='table'> 
                        <DataTable
                        columns={ column_RequestInbox }
                        data = { rideRequestInbox }
                        />
                </div>
            </div>

            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customModalStyles}>
                {riderDetails && (
                    <div>
                    <h2>User Details</h2>
                    <p>Name: {riderDetails.name}</p>
                    <p>Email: {riderDetails.email}</p>
                    <p>Phone: {riderDetails.phone}</p>
                    <p>Gender: {riderDetails.gender}</p>
                    <p>Department: {riderDetails.dept}</p>
                    <p>Year: {riderDetails.year}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
