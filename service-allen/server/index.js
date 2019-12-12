const express = require('express');
require('dotenv').config();
const parser = require('body-parser');
const morgan = require('morgan');
const db = require('./db/index.js');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/api/images/:restaurantId', (req, res) => {
  const id = parseInt(req.params.restaurantId);
  db.get(id)
    .then(entry => res.status(200).send(entry))
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});


const port = process.env.PORT || 3001;

app.listen(port, console.log(`Server running on port: ${port}`));
