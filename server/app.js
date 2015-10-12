var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//////// added 10/12
var mongoose = require('mongoose');
//var tasks = require('./models/tasks');

var index = require('./routes/index');
var app = express();


var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port: ', port);
});

////// added 10/12
var mongoURI = "mongodb://localhost:27017/to_do";
var mongoDB = mongoose.connect(mongoURI).connection;
mongoDB.once('open', function(){
    console.log('Connected to MongoDB!');
});
mongoDB.on('error', function(err){
    if(err){
        console.log('MongoDB error', err);
    }
});



app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.json());

//////// added 10/12
app.use(bodyParser.urlencoded({ extended: true }));


// When the browser gets here, it goes to the index file
app.use('/', index);


module.exports = app;
