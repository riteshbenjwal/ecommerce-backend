const app = require('./app');
const connectWithDb = require('./config/db');
require('dotenv').config();
const cloudinary = require('cloudinary');


//Connection with DB


connectWithDb();

//Cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//Port to Listen 


const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`);
})