const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const appointments = await connection('appointments')
      .where(req.userCrm ? 'doctor_id' : 'patient_id', req.userId)
      .select('*');
    return res.json({user: { id: req.userId, crm: req.userCrm }, appointments});
  }
};