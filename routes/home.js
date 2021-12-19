const express= require('express');
const router = express.Router();


//Methods

const {home,login} = require('../controllers/homeController');


router.route('/').get(home); 
router.route('/login').get(login); 






module.exports = router;