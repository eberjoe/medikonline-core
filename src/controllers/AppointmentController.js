const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        //const { page = 1 } = req.query;

        //const [count] = await connection('appointments').count();

        const appointments = await connection('appointments')
            .join('users', 'users.id', '=', 'appointments.doctor_id')
            //.limit(5)
            //.offset((page - 1) * 5)
            .select([
                'appointments.*',
                'users.id',
                'users.crm'
            ]);

        //res.header('X-Total-Count', count['count(*)']);

        return res.json(appointments);
    },

    async create(req, res) {
        const { date, doctor_id, patient_id } = req.body;

        const [id] = await connection('appointments').insert({
            date,
            doctor_id: req.userCrm ? req.userId : doctor_id,
            patient_id: req.userCrm ? patient_id : req.userId
        });

        return res.json({ id });
    },

    async delete(req, res) {
        const { id } = req.params;

        const appointment = await connection('appointments')
            .where('id', id)
            .select('patient_id')
            .first();
        if (appointment.patient_id !== req.userId && appointment.doctor_id !== req.userId) {
            return res.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('appointments').where('id', id).delete();

        return res.status(204).send();
    }
};