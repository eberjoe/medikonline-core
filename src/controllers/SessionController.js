const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async create(request, response) {
        const { id, password } = request.body;

        const user = await connection('users')
            .where('id', id)
            .select('*')
            .first();
        
        const passMatch = user && await bcrypt.compare(password, user.password);

        if (!user || !passMatch) {
            return response.status(400).json({ error: 'Could not authenticate' });
        }

        return response.json(user);
    }
};