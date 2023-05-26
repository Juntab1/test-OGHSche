var express = require('express');
var app = express();
var port = 8081;
var fs = require('fs');

app.use(express.static('public'));

app.get('/process_get', function(req, res) {
  var first_name = req.query.first_name;
  var last_name = req.query.last_name;

  var person = {
    Fname: first_name,
    Lname: last_name
  };

  savePersonToPublicFolder(person, function(err) {
    if (err) {
      res.status(404).send('User not saved');
      return;
    }

    res.send('User saved');
  });
});

function savePersonToPublicFolder(person, callback) {
  fs.writeFile('person.json', JSON.stringify(person), callback);
}

app.listen(port, function() {
  console.log('server up and running at port: %s', port);
});