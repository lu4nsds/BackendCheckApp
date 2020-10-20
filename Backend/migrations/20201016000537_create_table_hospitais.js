exports.up = function(knex, Promise) {
    return knex.schema.createTable('hospitais', table =>{
        table.increments('id').primary()
        table.string('name').notNull().unique()
        table.string('endereco').notNull()    
    })
  };

exports.down = function(knex,Promise) {
    return knex.schema.dropTable('hospitais')
};
