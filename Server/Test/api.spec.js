const request = require('supertest');
// import server
const server = require('../server');

describe('API server', () => {
    let api;
    let testMovie = {
        name: 'Bob',
        age: 6,
        releaseDate: 1995,
        rating: 8.8 
    };

    beforeAll(() => {
        // start the server and store it in the api variable
        api = server.listen(3000, () =>
            console.log('Test server running on port 3000')
        );
    });

    afterAll((done) => {
        // close the server, then run done
        console.log('Gracefully stopping test server');
        api.close(done);
    });

    it('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    });

    it('responds to get /movies with status 200', (done) => {
        request(api).get('/movies').expect(200, done);
    });

    it('responds to post /movies with status 201', (done) => {
        request(api)
            .post('/movies')
            .send(testMovie)
            .set('Accept', /application\/json/)
            .expect(201)
            .expect({ id: 4, ...testMovie }, done);
    });

    it('retrieves a movie by id', (done) => {
        request(api)
            .get('/movies/2')
            .expect(200)
            .expect({ id: 2, title: 'Whiplash', releaseDate: '2014', rating: 8.5 }, done);
    });

    it('responds to a unknown movie id with a 404', (done) => {
        request(api).get('/movies/42').expect(404).expect({}, done);
    });

    it('responds to delete /movies/:id with status 204', async () => {
        await request(api).delete('/movies/3').expect(204);

        const updatedMovies = await request(api).get('/movies');

        expect(updatedMovies.body.length).toBe(3);
    });

    it('responds to non existing paths with 404', (done) => {
        request(api).get('/no').expect(404, done);
    });

    it('responds to invalid method request with 405', (done) => {
        request(api).post('/').expect(405, done);
    });
});
