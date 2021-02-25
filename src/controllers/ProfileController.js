const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const user_id = request.headers.authorization;

        const appointments = await connection('appointments')
            .where('patient_id', user_id)
            .select('*');

        return response.json(appointments);
    }
};