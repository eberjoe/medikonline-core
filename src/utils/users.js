let users = [];

// Join user to appointment
function userJoin(socketId, id, appointmentId) {
  const user = { socketId, id, appointmentId };
  users.push(user);
  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves appointment
function userLeave(id) {
  const excluded = users.filter(user => user.id === id);
  users = users.filter(user => user.id !== id);
  return excluded[0];
}

// Get users present to appointment
function getAppointmentUsers(appointmentId) {
  return users.filter(user => user.appointmentId === appointmentId);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getAppointmentUsers
};