const app = require('./app');
const connectWithDb = require('./config/db');
require('dotenv').config();


//Connection with DB


connectWithDb();


//Port to Listen 


const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`);
})