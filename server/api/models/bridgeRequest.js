'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BridgeRequestSchema = new Schema({
    requester_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: 'Kindly enter the user id'
    },
    provider_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: 'Kindly enter the user id'
    },
    riderRouteId: {
        type: Schema.Types.ObjectId,
        ref: 'RideRequests',
        required: 'Kindly enter the user id'
    },
    providerRouteId: {
        type: Schema.Types.ObjectId,
        ref: 'ProvideRequests',
        required: 'Kindly enter the user id'
    },
    requester_source: [{
        type: Number,
        required: 'Kindly enter the source of the ride'
    }],
    requester_destination: [{
        type: Number,
        required: 'Kindly enter the destination of the ride'
    }],
    provider_source: [{
        type: Number,
        required: 'Kindly enter the source of the ride'
    }],
    provider_destination: [{
        type: Number,
        required: 'Kindly enter the destination of the ride'
    }],
    provider_via_points: [[{
        type: Number,
    }]],
    rider_title: {
        type: String,
        required: 'Kindly enter the title of the ride'
    },
    provider_title: {
        type: String,
        required: 'Kindly enter the title of the ride'
    },
    time: {
        type: Date,
        required: 'Kindly enter the time of the ride'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'done'],
        default: 'pending'
    },
});

module.exports = mongoose.model('BridgeRequests', BridgeRequestSchema);