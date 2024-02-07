import React , {useEffect, useState} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import './styles/style.css';
import Card from "@material-ui/core/Card";
import './styles/table.css';
import DataTable from 'react-data-table-component';
import {AppNavBar} from '../components/appNavBar';

export const UserRides = ()=> {

    //Necessary variables
    const [rideRequestList, setRideRequestList] = useState([]);

    //required methods

    useEffect(() => {
        const uid = localStorage.getItem('userId');
        console.log(uid);
        Axios.get(`http://localhost:8000/rideRequest/${uid}`).then((response) => {
            setRideRequestList(response.data);
            console.log(response.data);
            if(response.data.length === 0){
                alert('Currently no active ride requests are present for this account.');
            }
        });
    }, []);

    const cancelRideRequest = (id) =>{
        console.log(id);
        console.log('cancel ride request');
        Axios.delete(`http://localhost:8000/rideRequest/cancel/${id}`).then((response) => {
            console.log(response.data);
            alert('Your Ride request cancelled successfully.');
        });
    }

    //Render page code

    const column_rideRequest = [
        {
            name : 'Title',
            selector : (row) => row.title
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
            name : 'Available Rides',
            cell : (row)=> (
                <Link to={`/availableRides/${row.source}/${row.destination}/${row.time}/${row.title}/${row._id}`}>Available rides</Link>
            )
        },
        {
            name : 'Cancel Request',
            cell : (row)=> (
                <button onClick={()=> { cancelRideRequest(row._id) }}>Cancel</button>
            )
        }
    ];

    // Custom no records to display text

    const CustomNoDataComponent = () =>{
        return (
            <div className="custom-no-data">
                <br></br>
                <br></br>
                Currently no active ride requests are present for this account.
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
            <div className='head'><h2>My rides</h2></div>
                <div className='table'>
                    <Card> 
                        <DataTable
                        columns={ column_rideRequest}
                        data = {rideRequestList}
                        noDataComponent = {<CustomNoDataComponent />}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
}
