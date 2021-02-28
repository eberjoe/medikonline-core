const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv-safe').config();

const verifyJwt = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ auth: false, mesage: 'Failed to authenticate.' });
      req.userId = decoded.id;
      req.userCrm = decoded.crm;
      next();
  })
}

const UserController = require('./controllers/UserController');
const AppointmentController = require('./controllers/AppointmentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// desacopla o módulo de rotas do Express em uma variável
const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.check);
routes.post('/users', UserController.create);

routes.get('/profile', verifyJwt, ProfileController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.create);
routes.delete('/appontments/:id', AppointmentController.delete);


// comando do node para disponibilizar variável para o exterior
module.exports = routes;
