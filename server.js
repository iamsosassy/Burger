const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
    // go to the DB first and get all the burgers

    //var allBurgers = []
    res.render('home')
})

app.get('/about', function(req, res) {
    res.render('about')
})



app.get('/save', function(req, res) {
    console.log('req.body should b our stuff from form', req.body);
    // go save new thing to DB
})




app.listen(3000, function() {
    console.log('You are alive on 3000!!!')
})