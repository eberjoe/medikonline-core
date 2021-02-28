const bcrypt = require('bcrypt');
const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { isDoc } = req.params;
        const users = isDoc ?
            isDoc === 'true' ?
                await connection('users')
                    .whereNot('crm', '')
                :
                await connection('users')
                    .where('crm', '')
            :
            await connection.select('*')
                .from('users');
        return res.json(users);
    },

    async check(req, res) {
        const { id } = req.params;
        const user = await connection('users')
            .where('id', id)
            .select('id')
            .first();
        return res.json(user);
    },

    async create(req, res) {
        const { id, password, crm } = req.body;

        const encryptedPass = await bcrypt.hash(password, 12);
    
        try {
            await connection('users').insert({
                id,
                password: encryptedPass,
                crm
            });
            return res.json({ id });
        } catch(err) {
            console.log('Could not insert user!')
        }
    }
};