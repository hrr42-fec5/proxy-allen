const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3003;
const db = require('../database/index.js');
const Restaurant = require('../database/schema.js');
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})

app.get('/api/articles/:restaurantID', (req, res) => {
  var restId = parseInt(req.params.restaurantID);
  // console.log("Restaurant ID: ", restId);
  Restaurant.findOne({id: restId}).lean()
    .then((doc) => {
      res.send(doc);
      // console.log(doc);
    })
    .catch((err) => {
      console.log("Error finding restaurant in database: ", err);
    })
})


