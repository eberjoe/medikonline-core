const users = [];

// Join user to appointment
function userJoin(id, userId, appointmentId) {
  const user = { id, userId, appointmentId };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves appointment
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
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