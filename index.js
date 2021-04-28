const express = require('express');
const app = express();

const intialStart = require('./initialStart');

const mongoose = require('mongoose');

const url = ('mongodb://localhost:27017/dishDB');
//sudo mongod --dbpath=/System/Volumes/Data/data/db
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( response=> {
        console.log(response);
        console.log('successfully connecting to mongoose')})
    .catch(e=>{console.log(e)});



/*
* start a local server
* allow multiple source
*/
app.use(function (req,res, next) {
    var allowedOrigins = ['http://localhost:3000', '*'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials',
        'true');
    next();
});

intialStart();


// enable the controller
const esController = require('./controllers/elasticController.server');
esController(app);

const mongoController = require('./controllers/mongoController.server');
mongoController(app);

// start up the port at 4200
const PORT = process.env.PORT || 4200;
app.listen(PORT, ()=>{
    console.log(`process is listening on port: ${PORT}`);
})