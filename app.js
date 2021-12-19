const express = require('express');
require('dotenv').config();
const app = express();

//Import all routes

const home = require('./routes/home');


//router middleware

app.use('/api/v1',home);





//Export app js
module.exports = app;