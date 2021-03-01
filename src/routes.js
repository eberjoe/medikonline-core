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
const LoginCheckController = require('./controllers/LoginCheckController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/logincheck/:id', LoginCheckController.index);

routes.get('/users/:isDoc?', verifyJwt, UserController.index);
routes.post('/users', UserController.create);

routes.get('/profile', verifyJwt, ProfileController.index);

routes.get('/appointments', verifyJwt, AppointmentController.index);
routes.post('/appointments', verifyJwt, AppointmentController.create);
routes.delete('/appointments/:id', verifyJwt, AppointmentController.delete);

module.exports = routes;
