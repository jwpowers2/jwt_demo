var express = require( "express");
var path = require( "path");
var bodyParser = require('body-parser');
var app = express();
const port = 21337;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Content-Length,Authorization");
      //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.send(200);
    }
    else {
    //move on
      next();
    }
});

app.use(express.static(path.join(__dirname, "./static")));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);

var server = app.listen(port, function() {
 console.log("listening on port " + port);
});

