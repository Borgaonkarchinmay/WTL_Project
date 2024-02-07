import React , {useEffect, useState} from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import DataTable from 'react-data-table-component';
import {AppNavBar} from '../components/appNavBar';
import { RideInsight } from '../components/rideInsight';
import './styles/style.css';
import Card from "@material-ui/core/Card";
import './styles/table.css';

export const RideRequestsTrack = ()=> {

    //Necessary variables
    const [rideRequestsTrackList, setRideRequestsTrackList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [providerDetails, setProviderDetails] = useState();
    const [isRideInsightOpen, setIsRideInsightOpen] = useState(false);

    const [provSrc, setProvSrc] = useState();
    const [provDes, setProvDes] = useState();
    const [viaPoints, setViaPoints] = useState();
    const [riderSrc, setRiderSrc] = useState();
    const [riderDes, setRiderDes] = useState();


    const customModalStyles = {
        content: {
          width: '50%',
          height: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }
    };
    //required methods

    useEffect(() => {
        console.log('ride request track page');
        var uid = localStorage.getItem('userId');
        Axios.get(`http://localhost:8000/bridgeRequest/trackRiderRequest/${uid}`).then((response) => {
            setRideRequestsTrackList(response.data);
            console.log(response.data);
            if(response.data.length === 0){
                alert('Currently no rides are requested by this account.');
            }
        });
    }, []);

    
    const cancelRequest = (id, riderRouteId, providerRouteId) =>{
        console.log(id);
        console.log('cancel ride request');
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
    
    const fetchProviderDetails = (provider_id) =>{
        console.log('provider details');
        Axios.get(`http://localhost:8000/user/${provider_id}`).then((response) => {
            console.log(response.data);
            setProviderDetails(response.data);
            setIsOpen(true);
        }).catch( (error) =>{
            console.log(error);
        });
    }
    
    const closeModal = () =>{
        setIsOpen(false);
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

    const column_requestTrackList = [
        {
            name : 'Your Route Title',
            selector : (row) => row.rider_title
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
            name : 'Cancel Ride',
            cell : (row)=> (
                <button onClick={ () => { cancelRequest(row._id, row.riderRouteId, row.providerRouteId) } }>Cancel</button>
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
                    <button onClick={ () => { fetchProviderDetails(row.provider_id) } } disabled={!isAccepted} >View Rider</button>
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
                Currently no rides are requested by this account.
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
                <div className='head'><h2>Track requested rides</h2></div>
                <div className='table'> 
                    <Card>
                        <DataTable
                        columns={ column_requestTrackList }
                        data = { rideRequestsTrackList }
                        noDataComponent = {<CustomNoDataComponent />}
                        />
                    </Card>
                </div>
            </div>

            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customModalStyles}>
                {providerDetails && (
                    <div>
                    <h2>User Details</h2>
                    <p>Name: {providerDetails.name}</p>
                    <p>Email: {providerDetails.email}</p>
                    <p>Phone: {providerDetails.phone}</p>
                    <p>Gender: {providerDetails.gender}</p>
                    <p>Department: {providerDetails.dept}</p>
                    <p>Year: {providerDetails.year}</p>
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
