'user strict';

const mongoose = require('mongoose');

const BridgeRequest = mongoose.model('BridgeRequests');
const ProvideRequest = mongoose.model('ProvideRequests');
const RideRequest = mongoose.model('RideRequests');

exports.bridge_request = function (req, res) {
  console.log('register bridge request');
    var new_bridge_request = new BridgeRequest(req.body);

    new_bridge_request.save()
    .then(function(bridge_request) {
      res.json(bridge_request);
    })
    .catch(function(err) {
      res.send(err);
    });
}

exports.get_bridge_request_for_requester = function (req, res) {
    BridgeRequest.find({ requester_id: req.params.requester_id, status: { $ne: 'done' } })
  .then(function(bridge_request) {
    res.json(bridge_request);
  })
  .catch(function(err) {
    res.send(err);
  });
}

exports.get_bridge_request_for_provider = function (req, res) {
   BridgeRequest.find({ provider_id: req.params.provider_id, status: { $ne: 'done' }  })
  .then(function(bridge_request) {
    res.json(bridge_request);
  })
  .catch(function(err) {
    res.send(err);
  });
}

exports.delete_bridge_request = function (req, res) {
  console.log('delete bridge request');
  console.log(req.params.request_id);
  BridgeRequest.findOneAndDelete({ _id: req.params.request_id })
  .then(function(bridge_request) {
    res.json(bridge_request);
  })
  .catch(function(err) {
    res.send(err);
  });
}

exports.approve_bridge_request = function (req, res) {
  console.log('approve bridge request');
  console.log(req.params.bridge_request_id);
  BridgeRequest.findOneAndUpdate({ _id: req.params.bridge_request_id }, { status: 'confirmed' }, { new: true })
  .then(function(bridge_request) {
    res.json(bridge_request);
  })
  .catch(function(err) {
    res.send(err);
  });
}

exports.done_bridge_request = function (req, res) {
  console.log('done bridge request');
  console.log(req.params.bridge_request_id);
  console.log(req.params.providerRouteId);
  console.log(req.params.riderRouteId);

  BridgeRequest.findOneAndUpdate({ _id: req.params.bridge_request_id }, { status: 'done' }, { new: true })
  .then(function(bridge_request) {
     // delete provider_request
    ProvideRequest.findOneAndDelete({ _id: req.params.providerRouteId })
    .then(function(provide_request) {
      // delete rider_request
      RideRequest.findOneAndDelete({ _id: req.params.riderRouteId })
      .then(function(ride_request) {
        res.json({bridge_request, provide_request, ride_request});
      })
      .catch(function(err) {
        res.send(err);
      });
    })
    .catch(function(err) {
      res.send(err);
    });
  })
  .catch(function(err) {
    res.send(err);
  });
  
 

}
