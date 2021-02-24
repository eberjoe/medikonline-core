const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('appointments').count();

        const appointments = await connection('appointments')
            .join('users', 'users.id', '=', 'appointments.doctor_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'appointments.*',
                'users.name',
                'users.crm'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(appointments);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('appointments').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const appointment = await connection('appointments')
            .where('id', id)
            .select('ong_id')
            .first();

        if (appointment.patient_id !== user_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('appointments').where('id', id).delete();

        return response.status(204).send();
    }
};