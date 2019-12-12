const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const proxy = require('http-proxy-middleware');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static('public'));


//relative path routes
//need to change each services server to these new apis
//also make sure the get request of each service is relative
app.use(proxy('/api/images', {target: 'http://localhost:3001/' }));
app.use(proxy('/api/articles', {target: 'http://localhost:3003/' }));
app.use(proxy('/api/recommendations', {target: 'http://localhost:3005/' }));

const port = process.env.PORT || 3000;

app.listen(port, console.log(`Server running on port: ${port}`));
