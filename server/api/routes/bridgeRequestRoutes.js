'use strict';

const mongoose = require('mongoose');

module.exports = function(app) {
    const bridgeRequest = require('../controllers/bridgeRequestController');

    // provideRequest Routes

    app.route('/bridgeRequest/register')
        .post(bridgeRequest.bridge_request);

    app.route('/bridgeRequest/trackRiderRequest/:requester_id')
        .get(bridgeRequest.get_bridge_request_for_requester);
    
    app.route('/bridgeRequest/trackProviderRequest/:provider_id')
        .get(bridgeRequest.get_bridge_request_for_provider);

    app.route('/bridgeRequest/cancel/:request_id')
        .delete(bridgeRequest.delete_bridge_request);

    app.route('/bridgeRequest/accept/:bridge_request_id')
        .post(bridgeRequest.approve_bridge_request);
        
    app.route('/bridgeRequest/done/:bridge_request_id/:providerRouteId/:riderRouteId')
        .post(bridgeRequest.done_bridge_request);  
}