exports.up = function(knex) {
    return knex.schema.createTable('tipos_equip', table => {
        table.increments('id').primary();
        table.string('tipo').notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tipos_equip')
};
