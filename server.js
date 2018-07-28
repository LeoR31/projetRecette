var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

require('./app/routes/cakes.routes.js')(app);

//Start express server
var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)

})

module.exports = server