const express = require('express');
const cors = require('cors');
const movies = require('../Server/data')

const app = express();

app.use(express.json())
app.use(cors());


app.get('/', (req, res) => {
    res.send('Visit /movies to see all movies.')
})

//See all movies
app.get('/movies', (req, res) => {
    res.send(movies);
});

//Find by id
app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send('This movie is not in our list');
    res.send(movie);
})

//Add a movie
app.post('/movies', (req, res) => {
    const movie = {
        id: movies.length + 1,
        title: req.body.title,
        releaseDate: req.body.releaseDate,
        rating: req.body.rating
    };
    movies.push(movie);
    res.send(movies);
})

//Delete a movie
app.delete('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('This movie is not in our list')

    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    res.send(movies)
})

//Update a movie
app.put('/movies/:id', (req, res) => {
    const movie = movies.find(g => g.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('This movie is not in our list')

    movie.title = req.body.title;
    movie.releaseDate = req.body.releaseDate;
    movie.rating = req.body.rating;

    res.send(movies);
})

module.exports = app;