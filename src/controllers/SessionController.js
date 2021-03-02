const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv-safe').config();

module.exports = {
  async create(req, res) {
    const { id, password } = req.body;

    const user = await connection('users')
      .where('id', id)
      .select('*')
      .first();
  
    const passMatch = user && await bcrypt.compare(password, user.password);

    if (!user || !passMatch) {
      return res.status(400).json({ error: 'Could not authenticate' });
    }
    const token = jwt.sign({ id, crm: user.crm }, process.env.SECRET);

    return res.json({ auth: true, token: token });
  }
};