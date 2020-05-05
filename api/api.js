const express = require('express');
const HttpStatus = require('http-status-codes');

const PeopleService = require('./people-service');
const peopleService = new PeopleService();
const app = express();
const v1 = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/v1', v1);

v1.put('/people/:id', async (request, response) => {
    const id = request.params.id;
    const message = request.body;
    let isUpdated = await peopleService.updatePeople(id, message);
    if (!isUpdated) {
        response.sendStatus(HttpStatus.NOT_FOUND);
    } else {
        response.sendStatus(HttpStatus.OK);
    }
});

v1.get('/people', async (request, response) => {
    let results = await peopleService.getPeople(request.query);
    response.send(results);
});
// To be implemented!

module.exports = app;
