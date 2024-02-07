'use strict';

const mongoose = require('mongoose');

module.exports = function(app) {
    const provideRequest = require('../controllers/providerRequestController');

    // provideRequest Routes

    app.route('/provideRequest/register')
        .post(provideRequest.create_provider_request);

    app.route('/provideRequest/availableRides/:time')
        .get(provideRequest.filter_provider_request);
    
    app.route('/provideRequest/:userId')
        .get(provideRequest.fetch_all_provider_request);

    app.route('/provideRequest/updateStatus/:providerId')
        .post(provideRequest.update_status_provider_request);

    app.route('/provideRequest/cancel/:provider_request_id')
        .delete(provideRequest.delete_provider_request);
}