// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
//For date epochs
app.get("/api/timestamp/:date(\\d+)/", (req, res)=> {
  const date = new Date(parseInt(req.params.date));
  if(date instanceof Date && !isNaN(date))
    res.json({"unix": date.getTime(), "utc" : date.toUTCString() });
  else
    res.json({"error" : "Invalid Date" });
});

//For date strings
app.get("/api/timestamp/:date", (req, res)=>{
  const date = new Date(req.params.date);
  if(date instanceof Date && !isNaN(date))
    res.json({"unix": date.getTime(), "utc" : date.toUTCString() });
  else
    res.json({"error" : "Invalid Date" });
});

//For empty date parameter
app.get("/api/timestamp/", (req, res)=>{
  const date = new Date();
  if(date instanceof Date && !isNaN(date))
    res.json({"unix": date.getTime(), "utc" : date.toUTCString() });
  else
    res.json({"error" : "Invalid Date" });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});