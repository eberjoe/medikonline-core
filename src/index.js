const http = require('http');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const socketIo = require('socket.io');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getAppointmentUsers
} = require('./utils/users');

const port = 3333;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { 
  cors: {
    origin: '*',
    methods: ['GET', 'POST']  }
  }
);

io.on('connection', socket => { socket.on('join', ({ id, appointmentId }) => {
    const user = userJoin(socket.id, id, appointmentId);
    socket.join(user.appointmentId);
    io.to(user.appointmentId).emit('movement', getAppointmentUsers(user.appointmentId));
  });

  socket.on('chatMessage', ({ senderId, msg }) => {
    const user = getCurrentUser(senderId);
    io.to(user.appointmentId).emit('message', {
      senderId,
      tMessage: msg,
      timestamp: new Date()
    });
  });

  socket.on('leave', id => {
    const user = userLeave(id);

    if (user) {
      io.to(user.appointmentId).emit('movement', getAppointmentUsers(user.appointmentId));
    }
  })

  socket.on('disconnecting', id => {
    const user = userLeave(id);

    if (user) {
      io.to(user.appointmentId).emit('movement', getAppointmentUsers(user.appointmentId));
    }
  })

});

app.use(cors(/* add authorized origin here */));
app.use(express.json());
app.use(routes);

server.listen(port, () => console.log(`Listening on port ${port}`));