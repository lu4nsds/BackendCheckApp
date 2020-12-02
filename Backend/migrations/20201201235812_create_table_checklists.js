exports.up = function(knex) {
    return knex.schema.createTable('checklists', table => {
        table.increments('id').primary()
        table.integer('tipos_equipId').references('id')
            .inTable('tipos_equip').notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('checklists')
};
