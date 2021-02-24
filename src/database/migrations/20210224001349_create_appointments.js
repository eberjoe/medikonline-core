
exports.up = function(knex) {
  return knex.schema.createTable('appointments', function (table) {
      table.increments(); //ID
      table.date('date').notNullable();
      table.string('doctor_id').notNullable();
      table.foreign('doctor_id').references('id').inTable('users');
      table.string('patient_id').notNullable();
      table.foreign('patient_id').references('id').inTable('users');
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('appointments'); 
  };
  