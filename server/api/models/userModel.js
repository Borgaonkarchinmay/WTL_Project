'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the user'
    },
    email: {
        type: String,
        unique: true,
        required: 'Kindly enter the email of the user'
    },
    password: {
        type: String,
        required: 'Kindly enter the password of the user'
    },
    phone : {
        type: String,
        required: 'Kindly enter the phone number of the user',
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            }
        }

    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    dept: {
        type: String,
    },
    year: {
        type: String,
    },
});

module.exports = mongoose.model('Users', UserSchema);