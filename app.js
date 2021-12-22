const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload'); 


//For Swagger Documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//regular middleware

app.use(express.json());
app.use(express.urlencoded({extended: true}));

 
// cookies and file middleware

app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


//temp check

app.set("view engine", "ejs");

//morgan middleware
app.use(morgan('tiny'));

//Import all routes

const home = require('./routes/home');
const user = require('./routes/user');

 
//router middleware

app.use('/api/v1',home);
app.use('/api/v1',user);

app.get('/signuptest', (req,res)=>{
    res.render('signuptest')
})



//Export app js
module.exports = app;