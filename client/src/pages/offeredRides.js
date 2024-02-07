import React , {useEffect, useState} from 'react';
import Axios from 'axios';
import DataTable from 'react-data-table-component';
import {AppNavBar} from '../components/appNavBar';
import './styles/style.css';
import Card from "@material-ui/core/Card";
import './styles/table.css';

export const UserRideOffers = ()=> {

    //Necessary variables
    const [rideOffersList, setRideOffersList] = useState([]);
    var uid = localStorage.getItem('userId');
    //required methods

    useEffect(() => {
        Axios.get(`http://localhost:8000/provideRequest/${uid}`).then((response) => {
            setRideOffersList(response.data);
            console.log(response.data);
            if(response.data.length === 0){
                alert('Currently there are no offered rides for this account');
            }
        });
    }, [uid]);

    const cancelRideOffer = (id) =>{
        console.log(id);
        console.log('cancel ride request');
        Axios.delete(`http://localhost:8000/provideRequest/cancel/${id}`).then((response) => {
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
            name : 'Cancel Request',
            cell : (row)=> (
                <button onClick={()=> { cancelRideOffer(row._id) }}>Cancel</button>
            )
        }
    ];

    // Custom no records to display text

    const CustomNoDataComponent = () =>{
        return (
            <div className="custom-no-data">
                <br></br>
                <br></br>
                Currently there are no offered rides for this account
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

            <div>
                <div className='head'><h2>My ride offers</h2></div>
                <div className='table'>
                    <Card> 
                        <DataTable
                        columns={ column_rideRequest}
                        data = {rideOffersList}
                        noDataComponent = {<CustomNoDataComponent />}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
}
