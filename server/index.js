const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialization

const app = express();

const port = process.env.PORT || 8000;

app.use(cors({
    origin : ["http://localhost:3000"],
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials : true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// eslint-disable-next-line no-unused-vars
require('./api/models/userModel');
require('./api/models/rideRequestModel');
require('./api/models/provideRequestModel');
require('./api/models/bridgeRequest');
// created model loading here


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb+srv://bhadangeatharv:pict123@wtl-mini-project.bwsklrx.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("\n\nConnected to MongoDB"))
  .catch(err => {
    console.log('Unable to connect', err);
  });

const userRoutes = require('./api/routes/userRoutes'); // importing route
const rideRequestRoutes = require('./api/routes/rideRequestRoutes'); // importing route
const providerRequestRoutes = require('./api/routes/providerRequestRoutes'); // importing route
const bridgeRequestRoutes = require('./api/routes/bridgeRequestRoutes'); // importing route

//routes(app); // register the route
userRoutes(app); // register the route
rideRequestRoutes(app); // register the route
providerRequestRoutes(app); // register the route
bridgeRequestRoutes(app); // register the route

app.get('/', (req, res) =>{
    res.send('Hello');
})

app.listen(port, () => {
  console.log('Node.js + MongoDB RESTful API server started on: ' + port);
});


























