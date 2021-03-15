const { update } = require('../database/connection');
const connection = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { date, doctor_id, patient_id } = req.body;
    const [id] = await connection('appointments').insert({
      date,
      doctor_id: req.userCrm ? req.userId : doctor_id,
      patient_id: req.userCrm ? patient_id : req.userId
    });
    return res.json({ id });
  },

  async update(req, res) {
    const { id } = req.params;
    const { date } = req.body;
    await connection('appointments').where('id', id).update('date', date);
    return res.status(200).send();
  },

  async delete(req, res) {
    const { id } = req.params;
    const appointment = await connection('appointments')
      .where('id', id)
      .select('*')
      .first();
    if (appointment.patient_id !== req.userId && appointment.doctor_id !== req.userId) {
      return res.status(401).json({ error: 'Operation not permitted.' });
    }
    await connection('appointments').where('id', id).delete();

    return res.status(204).send();
  }
};