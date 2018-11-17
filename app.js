var express = require('express');
var bodyParser = require('body-parser');
var appRoute = require('./routes/route');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/ibmex', appRoute);

app.listen(3000, () => {
	console.log('Server is up and running');
});