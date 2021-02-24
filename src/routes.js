const express = require('express');

const UserController = require('./controllers/UserController');
const AppointmentController = require('./controllers/AppointmentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// desacopla o módulo de rotas do Express em uma variável
const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/profile', ProfileController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.create);
routes.delete('/appontments/:id', AppointmentController.delete);


// comando do node para disponibilizar variável para o exterior
module.exports = routes;
