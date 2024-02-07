'user strict';

const mongoose = require('mongoose');

const User = mongoose.model('Users');
const ProvideRequest = mongoose.model('ProvideRequests');
const { ObjectId } = require('bson');

exports.create_provider_request = function(req, res)  {
    // find the user by id
   User.findById(req.body.userId).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        const newProvideRequest = new ProvideRequest({
            provider_id: new ObjectId(req.body.userId),
            provider_name: user.name,
            source: req.body.source,
            title: req.body.title,
            destination: req.body.destination,
            time: new Date(req.body.time).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            via_points: req.body.via_points,
            requester_id: []
        });
    
        newProvideRequest.save().then(provideRequest => {
            res.send(provideRequest);
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the provide request."
            });
        }
        );
    }
    ).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    }
    );
}

exports.filter_provider_request = function(req, res) {
    // filter by time, status
    // filter by time
    console.log(`reached available ride route ${req.params.time}`);

    if (req.params.time) {
        ProvideRequest.find({ time: req.params.time, status: 'available' }).then(provideRequests => {
            if (!provideRequests) {
                return res.status(404).send({
                    message: "Provide requests not found with time " + req.body.time
                });
            }
            // if (req.body.status) {
            //     provideRequests = provideRequests.filter(provideRequest => provideRequest.status === "open");
            // }
            console.log(provideRequests);
            res.send(provideRequests);
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving provide requests."
            });
        }
        );
    }
}

// Updated by chinmay

exports.fetch_all_provider_request = function(req, res) {
    // filter by time, status
    // filter by time
    console.log(`reached fetch_all_provider_request ride route ${req.params.userId}`);

    if (req.params.userId) {
        ProvideRequest.find({ provider_id: req.params.userId, status: 'available' }).then(provideRequests => {
            if (!provideRequests) {
                return res.status(404).send({
                    message: "Provide requests not found with userId " + req.params.userId
                });
            }
            // if (req.body.status) {
            //     provideRequests = provideRequests.filter(provideRequest => provideRequest.status === "open");
            // }
            console.log(provideRequests);
            res.send(provideRequests);
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving provide requests."
            });
        }
        );
    }
}

// update a provide request status
exports.close_provider_request = function(req, res) {
    if (req.body.status) {
        ProvideRequest.findOneAndUpdate({ provider_id: req.params.providerId }, { status: "close" }).then(provideRequest => {
            if (!provideRequest) {
                return res.status(404).send({
                    message: "Provide request not found with id " + req.params.providerId
                });
            }
            res.send(provideRequest);
        }
        ).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Provide request not found with id " + req.params.providerId
                });
            }
            return res.status(500).send({
                message: "Error updating provide request with id " + req.params.providerId
            });
        }
        );
    }
}

// update a provide request status
exports.update_status_provider_request = function(req, res) {
    console.log('update status provider');
    console.log(req.params.providerId);
    console.log(req.body.status);
    if (req.body.status) {
        ProvideRequest.findOneAndUpdate({ _id: req.params.providerId }, { status: req.body.status }).then(provideRequest => {
            if (!provideRequest) {
                return res.status(404).send({
                    message: "Provide request not found with id " + req.params.providerId
                });
            }
            res.send(provideRequest);
        }
        ).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Provide request not found with id " + req.params.providerId
                });
            }
            return res.status(500).send({
                message: "Error updating provide request with id " + req.params.providerId
            });
        }
        );
    }
}

exports.delete_provider_request = function (req, res) {
    ProvideRequest.findOneAndDelete({ _id: req.params.provider_request_id })
    .then(function(provider_request) {
      res.json(provider_request);
    })
    .catch(function(err) {
      res.send(err);
    });
  }