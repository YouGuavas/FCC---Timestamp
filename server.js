// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/:DATE", function (req, res) {
  var date = Date.parse(req.params.DATE);//new Date(req.params.DATE);
  if (date && isNaN(req.params.DATE)) {
    date = new Date(req.params.DATE);
    var unix = Number(date.getTime());
    var natural = req.params.DATE;
    myFunc(res, unix, natural);
  } else if (Number.isInteger(Number(req.params.DATE))) {
    var unix = Number(req.params.DATE);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var natural = new Date(Number(req.params.DATE));
    natural = months[natural.getMonth()] +' '+ natural.getDate() +', '+ natural.getFullYear();
    myFunc(res, unix, natural);
  }
  else {
    var unix = null;
    var natural = null;
    myFunc(res, unix, natural);
  }
  //response.sendFile(__dirname + '/views/index.html');
});
function myFunc(j, unix, natural) {
  j.setHeader('Content-Type', 'application/json');
  j.send(JSON.stringify({unix, natural}));
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
