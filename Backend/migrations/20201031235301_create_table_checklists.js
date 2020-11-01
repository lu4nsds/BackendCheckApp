exports.up = function(knex) {
    return knex.schema.createTable('checklists', table => {
        table.increments('id').primary()
        table.integer('tipo_equipId').references('id')
            .inTable('tipo_equip').notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('checklists')
};
