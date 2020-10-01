// server.js
const cors = require('cors');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');

//CREATE EXPRESS APP
const app = express();
app.use(cors());
app.use(bodyParser.json());
 
// DECLARE JWT-secret
const JWT_Secret = 'secret_key';

var testUser = { user: 'izan', password: 'izan'};

app.post('/api/authenticate', (req, res) => {
console.log(req.body)
 
  if (req.body) {
    var user = req.body;
    console.log(user)
 
    if (testUser.user===req.body.user && testUser.password === req.body.password) {
      var token = jwt.sign(user, JWT_Secret);
      res.status(200).send({
        signed_user: user,
        token: token
      });
    } else {
      res.status(403).send({
        errorMessage: 'Authorisation required!'
      });
    }
  } else {
    res.status(403).send({
      errorMessage: 'Please provide user and password'
    });
  }
 
});

app.listen(5000, () => console.log('Server started on port 5000'));
