'use strict';

module.exports = function(app) {
    const rideRequest = require('../controllers/rideRequestController');

    // rideRequest Routes

    app.route('/rideRequest/register')
        .post(rideRequest.create_ride_request);

    app.route('/rideRequest/:rideRequesterId')
        .get(rideRequest.all_ride_requests);
    
    app.route('/rideRequest/updateStatus/:rideRequesterId')
        .post(rideRequest.update_status_ride_request);

    app.route('/rideRequest/cancel/:rider_request_id')
        .delete(rideRequest.delete_rider_request);
}



