const connection = require('../database/connection');

 module.exports = {
   async index(req, res) {
      const { id } = req.params;
      const user = await connection('users')
          .where('id', id)
          .select('id')
          .first();
      return res.json(user);
  }
}