exports.up = function(knex) {
    return knex.schema.createTable('tipo_equip', table => {
        table.increments('id').primary();
        table.string('tipo').notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tipo_equip')
};
