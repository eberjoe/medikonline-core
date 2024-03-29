
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.string('id').primary();
    table.string('password').notNullable();
    table.string('crm');
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
