const http = require('http');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const socketIo = require('socket.io');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const port = 3333;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {  cors: {    origin: 'http://localhost:3000',    methods: ['GET', 'POST']  }});

io.on('connection', socket => {
  socket.on('join', ({ userId, appointmentId }) => {
    const user = userJoin(socket.id, userId, appointmentId);
    socket.join(user.appointmentId);
    socket.broadcast
      .to(user.appointmentId)
      .emit(
        'message',
        `${user.userId} entrou na consulta.`
      );

    io.to(user.appointmentId).emit('appointmentUsers', {
      appointmentId: user.appointmentId,
      users: getAppointmentUsers(user.appointmentId)
    });
  });

  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
    io.to(user.appointmentId).emit('message', msg);
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.appointmentId).emit(
        'message',
        `${user.userId} saiu da consulta.`
      );

      io.to(user.appointmentId).emit('appointmentUsers', {
        appointmentId: user.appointmentId,
        users: getAppointmentUsers(user.appointmentId)
      });
    }
  })
});

app.use(cors(/* add authorized origin here */));
app.use(express.json());
app.use(routes);

server.listen(port, () => console.log(`Listening on port ${port}`));