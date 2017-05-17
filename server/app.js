require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var router = require('./router/router.js');
var sessions = require('./sessions.js');

var app = express();
var IP = process.env.IP || 'localhost';
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));
app.use(sessions(process.env.REDISCLOUD_URL, process.env.COOKIE_SECRET));

app.use(router);

app.get('*', function(request, response) {
  console.log('session', request.sessionID, request.session.user);
  response.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, function () {
  console.log('listening right now on port', PORT);
});

console.log('listening on', IP, PORT);

//adding comment to test review apps

module.exports.app = app;