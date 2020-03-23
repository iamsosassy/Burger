var express = require('express');
var router = express.Router();
var burger = require('../model/burger.js');


//Setup Routes


router.get('/', function(req, res) {
    res.redirect('/index');
});

// Index Page 
router.get('/index', function(req, res) {
    burger.selectAll(function(data) {
        var burObject = { burgers: data };
        //console.log(burObject);
        res.render('index', burObject);
    });
});

// Create a New Burger
router.post('/burger/create', function(req, res) {
    console.log('We are in the controler route /burger/create!!')
    burger.insertOne(req.body.burger_name, function() {
        res.redirect('/index');
    });
});

// Devour a Burger
router.post('/burger/eat/:id', function(req, res) {
    burger.updateOne(req.params.id, function() {
        res.redirect('/index');
    });
});

// Export routes
module.exports = router;