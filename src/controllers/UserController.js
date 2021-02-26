const bcrypt = require('bcrypt');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');
        return response.json(users);
    },

    async check(request, response) {
        const { id } = request.params;
        const user = await connection('users')
            .where('id', id)
            .select('id')
            .first();
        return response.json(user);
    },

    async create(request, response) {
        const { id, password, crm } = request.body;

        const encryptedPass = await bcrypt.hash(password, 12);
    
        try {
            await connection('users').insert({
                id,
                password: encryptedPass,
                crm
            });
            return response.json({ id });
        } catch(err) {
            console.log('Could not insert user!')
        }
    }
};