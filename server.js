var express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 1993;
var app = express();
var routes = require('./routes')
var cors = require('cors')
require('dotenv').config();
var database =  require('./utils/DatabaseConnectionService');



//conntect do database
database.connect();

//CORS middleware
var corsMiddleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'localhost'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    next();
}

app.use(corsMiddleware);
app.use('*', cors());
app.use(bodyParser.json())

app.use('/api', routes)

app.listen(PORT, (error) => {
    if(error) {
        console.log('error: ===>    ' + error)
    } else {
        console.log('applicaion running on port ' + PORT)
    }
})