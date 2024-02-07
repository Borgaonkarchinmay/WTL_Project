import React , {useEffect, useState} from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import {AppNavBar} from '../components/appNavBar';
import { RideInsight } from '../components/rideInsight';
import './styles/style.css';
import Card from "@material-ui/core/Card";
import './styles/table.css';

export const AvailableRides = ()=> {

    //Necessary variables
    const [availableRideList, setAvailableRideList] = useState([]);
    const {src, des, time, riderTitle, riderRouteId} = useParams();

    const [isRideInsightOpen, setIsRideInsightOpen] = useState(false);
    const [provSrc, setProvSrc] = useState();
    const [provDes, setProvDes] = useState();
    const [viaPoints, setViaPoints] = useState();
    const [riderSrc, setRiderSrc] = useState();
    const [riderDes, setRiderDes] = useState();

    var srcArray = src.split(',');
    var desArray = des.split(',');
    var riderSource = [parseFloat(srcArray[0]).toFixed(6), parseFloat(srcArray[1]).toFixed(6)];
    var riderDestination = [parseFloat(desArray[0]).toFixed(6), parseFloat(desArray[1]).toFixed(6)]
    //required methods

    useEffect(() => {
        console.log('available rides page');
        console.log(time);
        Axios.get(`http://localhost:8000/provideRequest/availableRides/${time}`).then((response) => {
            setAvailableRideList(response.data);
            console.log(response.data);
            if(response.data.length === 0){
                alert('Currently there are no available rides for the requested route.');    
            }
            //console.log(`Provider source is ${temp}`)
        });
    }, [time]);

    const requestRide = (pid, provSrc, provDes, provViaPoints, provTitle, providerRouteId) =>{
        console.log('requestRide');
        console.log('rider' + riderRouteId);
        console.log('provider' + providerRouteId);
        console.log('requestRide');
        var uid = localStorage.getItem('userId');

        Axios.post(`http://localhost:8000/bridgeRequest/register`, {
            requester_id : uid,
            provider_id : pid,
            riderRouteId : riderRouteId,
            providerRouteId : providerRouteId,
            requester_source : riderSource,
            requester_destination : riderDestination,
            provider_source : provSrc,
            provider_destination : provDes,
            provider_via_points : provViaPoints,
            rider_title : riderTitle,
            provider_title : provTitle,
            time : time
        }).then((response) => {
            setAvailableRideList(response.data);
            console.log(response.data);
            alert('Your request for the selected route is registered successfully.');
            //console.log(`Provider source is ${temp}`)
        });

        Axios.post(`http://localhost:8000/rideRequest/updateStatus/${riderRouteId}`, {
            status : 'unavailable'
        }).then((response) => {
            console.log('rider unavailable');
            console.log(response.data);
            //console.log(`Provider source is ${temp}`)
        });

        Axios.post(`http://localhost:8000/provideRequest/updateStatus/${providerRouteId}`, {
            status : 'unavailable'
        }).then((response) => {
            console.log('provider unavailable');
            console.log(response.data);
            //console.log(`Provider source is ${temp}`)
        });
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

    // Custom no records to display text

    const CustomNoDataComponent = () =>{
        return (
            <div className="custom-no-data">
                <br></br>
                <br></br>
                Currently there are no available rides for the requested route.
                <br></br>
                <br></br>
            </div>
        );
    }

    //Render page code

    const column_AvailableRides = [
        {
            name : 'Provider Name',
            selector : (row) => row.provider_name
        },
        {
            name : 'Provider\'s Ride Title',
            selector : (row) => row.title
        },
        {
            name : 'Time',
            selector : (row) => row.time
        },
        {   
            name : 'Ride Insight',
            cell : (row)=> (
                <button onClick={ () => { rideInsight(row.source, row.destination, row.via_points, riderSource, riderDestination) } }>Ride Insight</button>
            )
        },
        {
            name : 'Request ride',
            cell : (row)=> (
                <button onClick={ () => { requestRide(row.provider_id, row.source, row.destination, row.via_points, row.title, row._id) } }>Request this ride</button>
            )
        }
    ];

    return (
        <div  className='bck' >
            <AppNavBar></AppNavBar>
            <br></br>
            <div>
                <div className='head'><h2>Available rides</h2></div>
                <div className='table'>
                    <Card> 
                        <DataTable
                        columns={ column_AvailableRides}
                        data = { availableRideList }
                        noDataComponent = {<CustomNoDataComponent />}
                        />
                    </Card>
                </div>
            </div>

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
