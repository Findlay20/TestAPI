const express = require('express');
const cors = require('cors');
const movies = require('../Server/data')

const app = express();

app.use(express.json())
app.use(cors());

//See all movies
app.get('/movies', (req, res) => {
    res.send(movies);
});



module.exports = app;