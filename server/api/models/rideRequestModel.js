'user strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RideRequestSchema = new Schema({
    requester_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: 'Kindly enter the user id'
    },
    title: {
        type: String,
        required: 'Kindly enter the title of the ride'
    },
    source: [{
        type: Number,
        required: 'Kindly enter the source of the ride'
    }],
    destination: [{
        type: Number,
        required: 'Kindly enter the destination of the ride'
    }],
    time: {
        type: Date,
        required: 'Kindly enter the time of the ride'
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
    provider_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

module.exports = mongoose.model('RideRequests', RideRequestSchema);