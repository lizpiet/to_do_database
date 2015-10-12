var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

var list = mongoose.model('todo', {event:String, time:Date});

//"router.get" is saying, a call is getting and sending this static file
router.get('/', function( req, res, next){

    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

// "router.post" is saying,
router.post('/add', function(request, response, next){
    var addOns = new list({event:request.body.event, time:request.body.time});
    addOns.save(function(err){
        if(err)console.log("meow%s", err);
        response.send(addOns.toJSON());
        next();
    });
});

router.get('/todo', function(req, res, next){
    return list.find({}).exec(function(err, todo){
        if(err)throw new Error(err);
        res.send(JSON.stringify(todo));
        next();
    });
});

router.delete('/deleteItem/:id', function(req, res, next){
    console.log(req.params.id);

    list.remove({_id : req.params.id}, function(err){
        if(err) throw err;
        console.log('Everything went awesome!');
        res.sendStatus(200);
    });
});

module.exports = router;
