const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser')

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


app.get('/', function(req, res) {
    // go to the DB first and get all the burgers
    var allBurgers = []
    res.render('index')
})



app.get('/save', function(req, res) {
    console.log('req.body should b our stuff from form', req.body);
    // go save new thing to DB
})


// app.post('/burger/create', function(req, res) {
// console.log(req.body);
//     // Save to DB now !!!!

// })

var routes = require('./controller/burgers_controller.js')
app.use(routes);

app.listen(3000, function() {
    console.log('You are alive on 3000!!!')
})