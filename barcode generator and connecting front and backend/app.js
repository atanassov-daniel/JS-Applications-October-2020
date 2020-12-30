// start server by typing [  node app.js  ] in the terminal
var express = require('express'); // npm i express
var bodyParser = require('body-parser'); // npm i body-parser
var app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({
    extended: true
}));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

app.post('/LEDon', function (req, res) {
    console.log(Object.keys(req.body)[0]);
    console.log('LEDon button pressed!');
});

app.listen(5500);