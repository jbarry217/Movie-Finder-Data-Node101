const e = require('express');
const express = require('express');
var morgan = require('morgan');
var movieData = require('../package.json');
require('dotenv').config();

const app = express();
const api_key = process.env.API_KEY;
const axios = require('axios').default;

var cache = [];
// add routes and middleware 
app.use(morgan('dev'));

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

app.get('/', (req, res) => {

    for (let i = 0; i < cache.length; i++) {
        if (req.url["i"] == cache[i]["imdbID"]) {
            res.status(200).send(cache[i]);
        } else if (req.query["t"] == cache[i]["Title"]) {
                res.status(200).send(cache[i]);
                return;
        }
    }
    
    var url = `http://www.omdbapi.com${req.url}&apikey=${api_key}`;
    axios.get(url)
    .then(movieObj => {
    cache.push(movieObj.data);
    res.status(200).send(movieObj.data);
    });
});

module.exports = app;