const moviesData = require('../data');

class Movie {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.age = data.age;
    }

    static get all() {
        const movies = moviesData.map((movie) => new Movie(movie));
        return cats;
    }

    static findById(id) {
        try {
            const movieData = moviesData.filter((movie) => movie.id === id)[0];
            const movie = new movie(movieData);
            return movie;
        } catch (err) {
            throw new Error('This movie is not in our list');
        }
    }

    static create(movie) {
        const newMovieId = moviesData.length + 1;
        const newMovie = new Movie({ id: newMovieId, ...movie });
        moviesData.push(newMovie);
        return newMovie;
    }

    destroy() {
        const movie = moviesData.filter((movie) => movie.id === this.id)[0];
        moviesData.splice(moviesData.indexOf(movie), 1);
    }
}

module.exports = Movie;
