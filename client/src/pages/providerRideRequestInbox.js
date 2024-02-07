import React , {useEffect, useState} from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import DataTable from 'react-data-table-component';
import {AppNavBar} from '../components/appNavBar';
import { RideInsight } from '../components/rideInsight';
import './styles/style.css';
import Card from "@material-ui/core/Card";
import './styles/table.css';

export const ProviderRideRequestInbox = ()=> {

    //Necessary variables
    const [rideRequestInbox, setRideRequestInbox] = useState([]);
    const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
    const [isRideInsightOpen, setIsRideInsightOpen] = useState(false);
    const [riderDetails, setRiderDetails] = useState();

    const [provSrc, setProvSrc] = useState();
    const [provDes, setProvDes] = useState();
    const [viaPoints, setViaPoints] = useState();
    const [riderSrc, setRiderSrc] = useState();
    const [riderDes, setRiderDes] = useState();
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
            if(response.data.length === 0){
                alert('Currently there are no ride requests for the rides offered by this account.');
            }
        });
    }, []);

    const AcceptRequest = (request_id, requester_id, riderRouteId, providerRouteId) =>{
        console.log('AcceptRequest');
        console.log(request_id + requester_id);
        // Accept request
        Axios.post(`http://localhost:8000/bridgeRequest/accept/${request_id}`).then((response) => {

            console.log(response.data);
        });
        
        // Fetch user details
        fetchRiderDetails(requester_id);
    }

    const RejectRequest = (id, riderRouteId, providerRouteId) =>{
        console.log(id);
        console.log('reject ride request');
        Axios.delete(`http://localhost:8000/bridgeRequest/cancel/${id}`).then((response) => {
            console.log(response.data);
            alert('Your Ride request cancelled successfully.');
        });

        Axios.post(`http://localhost:8000/rideRequest/updateStatus/${riderRouteId}`, {
            status : 'available'
        }).then((response) => {
            console.log('rider unavailable');
            console.log(response.data);
            //console.log(`Provider source is ${temp}`)
        });

        Axios.post(`http://localhost:8000/provideRequest/updateStatus/${providerRouteId}`, {
            status : 'available'
        }).then((response) => {
            console.log('provider unavailable');
            console.log(response.data);
            //console.log(`Provider source is ${temp}`)
        });
    }
    
    const DoneRequest = (requester_id, riderRouteId, providerRouteId) =>{
        console.log('done');
        console.log(requester_id);
        console.log(riderRouteId);
        console.log(providerRouteId);
        Axios.post(`http://localhost:8000/bridgeRequest/done/${requester_id}/${providerRouteId}/${riderRouteId}`).then((response) => {
            console.log(response.data);
            alert('Request closed successfully!');
        });
    }

    const fetchRiderDetails = (requester_id) =>{
        console.log('AcceptRequest');
        Axios.get(`http://localhost:8000/user/${requester_id}`).then((response) => {
            console.log(response.data);
            setRiderDetails(response.data);
            setIsUserDetailsOpen(true);
        }).catch( (error) =>{
            console.log(error);
        });
    }

    const closeUserDetailsModal = () =>{
        setIsUserDetailsOpen(false);
    }

    const closeRideInsightModal = () =>{
        setIsRideInsightOpen(false);
    }

    const rideInsight = (psrc, pdes, vpts, rsrc, rdes) =>{
        setProvSrc(psrc);
        setProvDes(pdes);
        setViaPoints(vpts);
        setRiderSrc(rsrc);
        setRiderDes(rdes);
        setIsRideInsightOpen(true);
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
            name : 'Status',
            selector : (row) => row.status
        },
        {   
            name : 'Ride Insight',
            cell : (row)=> (
                <button onClick={ () => { rideInsight(row.provider_source, row.provider_destination, row.provider_via_points, row.requester_source, row.requester_destination) } }>Ride Insight</button>
            )
        },
        {
            name : 'Accept Ride',
            cell : (row)=> (
                <button onClick={ () => { AcceptRequest(row._id, row.requester_id, row.riderRouteId, row.providerRouteId) } }>Accept</button>
            )
        },
        {
            name : 'Reject Ride',
            cell : (row)=> (
                <button onClick={ () => { RejectRequest(row._id, row.riderRouteId, row.providerRouteId) } }>Reject</button>
            )
        },
        {
            name : 'Done This Ride',
            cell : (row)=> (
                <button onClick={ () => { DoneRequest(row._id, row.riderRouteId, row.providerRouteId) } }>Done</button>
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
                    <button onClick={ () => { fetchRiderDetails(row.requester_id) } } disabled={!isAccepted} >View Rider</button>
                );
            }
        }
    ];

    // Custom no records to display text

    const CustomNoDataComponent = () =>{
        return (
            <div className="custom-no-data">
                <br></br>
                <br></br>
                Currently there are no ride requests for the rides offered by this account.
                <br></br>
                <br></br>
            </div>
        );
    }

    //Render page code

    return (
        <div  className='bck' >
            <AppNavBar></AppNavBar>
            <br></br>
            <div >
                <div className='head'><h2>Ride request inbox</h2></div>
                <div className='table'>
                    <Card> 
                        <DataTable
                        columns={ column_RequestInbox }
                        data = { rideRequestInbox }
                        noDataComponent = {<CustomNoDataComponent />}
                        />
                    </Card>
                </div>
            </div>

            <Modal isOpen={isUserDetailsOpen} onRequestClose={closeUserDetailsModal} style={customModalStyles}>
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

            <Modal isOpen={isRideInsightOpen} onRequestClose={closeRideInsightModal}>
                {(
                    <div>
                        <RideInsight providerSrc={provSrc} providerDes={provDes} viaPoints={viaPoints} riderSrc={riderSrc} riderDes={riderDes}></RideInsight>
                    </div>
                )}
            </Modal>

            <Modal isOpen={isRideInsightOpen} onRequestClose={closeRideInsightModal}>
                {(
                    <div className='ride-insight-popup'>
                        <RideInsight providerSrc={provSrc} providerDes={provDes} viaPoints={viaPoints} riderSrc={riderSrc} riderDes={riderDes}></RideInsight>
                    </div>
                )}
            </Modal>
        </div>
    );
}
