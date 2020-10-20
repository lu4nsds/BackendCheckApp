exports.up = function(knex) {
    return knex.schema.createTable('checklists', table => {
        table.increments('id').primary()
        table.integer('preventivasId').references('id')
            .inTable('preventivas').notNull()
        table.string('lista').notNull() 
    })   
};

exports.down = function(knex) {
    return knex.schema.dropTable('checklists')
};
