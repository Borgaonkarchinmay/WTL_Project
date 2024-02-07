'use strict';

const mongoose = require('mongoose');

const User = mongoose.model('Users');
var bcrypt = require("bcryptjs");


exports.create_a_user = function(req, res) {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phone: req.body.phone,
        gender: req.body.gender,
        dept: req.body.department,
        year: req.body.year
    });

    newUser.save().then(user => {
        res.send(user);
    }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    }   
    );
}

exports.read_a_user = function(req, res) {
    User.findOne({_id: req.params.userId}).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found with id 1" + req.params.userId
            });
        }
        res.send(user);
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

exports.login_a_user = function(req, res) {
    console.log('login a user');
    User.findOne({email: req.body.email}).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found with id" + req.body.email
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                message: "Invalid Password"
            });
        }
        res.json({userId: user._id, username: user.email, name: user.name});
    }
    ).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.body.email
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.body.email
        });
    }
    );
}

exports.check_if_user_is_logged_in = function(req, res) {
    User.findById(req.params.userId).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "false"
            });
        }
        if (req.params.email != user.email) {
            return res.status(401).send({
                message: "false"
            });
        }

        res.send({message: "true"});
    }
    ).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "false"
            });
        }
        return res.status(500).send({
            message: "false"
        });
    }
    );
}

