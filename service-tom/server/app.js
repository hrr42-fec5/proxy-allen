const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');
const db = require('./db/index.js');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('client'));

app.get('/api/recommendations/:restaurantId', (req, res) => {
  var id = req.params.restaurantId;
  db.get(id)
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

const port = 3005;
app.listen(port, () => console.log(`listening on port ${port}`));