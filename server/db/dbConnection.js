require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/' + process.env.DATABASE_NAME
).then(
    ()=>{
        console.log("Database connection successful");
    }
).catch(
    (err)=>{
        console.log("Database connection failed" + err);
    }
);

