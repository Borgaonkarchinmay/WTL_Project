'use strict';

const mongoose = require('mongoose');

const User = mongoose.model('Users');
const RideRequest = mongoose.model('RideRequests');
const ProvideRequest = mongoose.model('ProvideRequests');
var bcrypt = require("bcryptjs");
const { ObjectId } = require('bson');

exports.create_ride_request = function (req, res) {

    const newRideRequest = new RideRequest({
        requester_id: new ObjectId(req.body.userId),
        source: req.body.source,
        title: req.body.title,
        destination: req.body.destination,
        time: new Date(req.body.time).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        status: req.body.status,
        provider_id: new ObjectId(req.body.provider_id)
    });

    newRideRequest.save().then(rideRequest => {
        console.log('document save successfull');
        res.send(rideRequest);
    }).catch(err => {
        console.log('500 error');
        res.status(500).send({
            message: err.message || "Some error occurred while creating the ride request."
        });
    });
}

// close a ride request status
exports.close_ride_request = function (req, res) {

    if (req.body.status) {
        RideRequest.findOneAndUpdate({ requester_id: req.params.rideRequesterId }, { status: "close" }).then(rideRequest => {
            if (!rideRequest) {
                return res.status(404).send({
                    message: "Ride request not found with id " + req.params.rideRequestId
                });
            }
            res.send(rideRequest);
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving ride requests."
            });
        }
        );
    }
}

// Fetch all ride request of a customer
exports.all_ride_requests = function (req, res) {
    
        console.log('all ride requests');
        RideRequest.find({ requester_id: req.params.rideRequesterId, status : 'available' }).then(rideRequest => {
            if (!rideRequest) {
                return res.status(404).send({
                    message: "Ride request not found with id " + req.params.rideRequestId
                });
            }
            console.log(rideRequest);
            res.send(rideRequest);
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving ride requests."
            });
        }
        );
}

// update a ride request status
exports.update_status_ride_request = function (req, res) {
    console.log('update status rider');
    console.log(req.params.rideRequesterId);
    console.log(req.body.status);
    if (req.body.status) {
        RideRequest.findOneAndUpdate({ _id: req.params.rideRequesterId }, { status: req.body.status }).then(rideRequest => {
            if (!rideRequest) {
                return res.status(404).send({
                    message: "Ride request not found with id " + req.params.rideRequestId
                });
            }
            res.send(rideRequest);
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving ride requests."
            });
        }
        );
    }
}

exports.delete_rider_request = function (req, res) {
    RideRequest.findOneAndDelete({ _id: req.params.rider_request_id })
    .then(function(rider_request) {
      res.json(rider_request);
    })
    .catch(function(err) {
      res.send(err);
    });
  }