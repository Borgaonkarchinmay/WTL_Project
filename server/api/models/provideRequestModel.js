'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProvideRequestSchema = new Schema({
    provider_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: 'Kindly enter the user id'
    },
    provider_name: {
        type: String,
        required: 'Kindly give the name of the provider'
    },
    title: {
        type: String,
        required: 'Kindly enter the title of the ride'
    },
    source: [{
        type: String,
        required: 'Kindly enter the source of the ride'
    }],
    destination: [{
        type: String,
        required: 'Kindly enter the destination of the ride'
    }],
    via_points: [[{
        type: String,
    }]],
    time: {
        type: Date,
        required: 'Kindly enter the time of the ride'
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
    requester_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
});

module.exports = mongoose.model('ProvideRequests', ProvideRequestSchema);