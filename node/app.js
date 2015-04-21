var express = require('express');
var app = express();

app.get('/status', function(req, res) {
  "use strict";
  res.set('Content-Type', 'text/plain');
  res.send('OK');
});

app.listen(9000);
