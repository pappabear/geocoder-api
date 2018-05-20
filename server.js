var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser')

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


var routes = require('./api/routes')
routes(app) 

app.listen(port)

console.log('GeoCoder RESTful API server started on: ' + port)