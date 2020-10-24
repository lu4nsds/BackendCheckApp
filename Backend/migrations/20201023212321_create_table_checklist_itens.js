exports.up = function(knex) {
    return knex.schema.createTable('checklist_itens', table => {
        table.increments('id').primary();
        table.string('procedimento').notNull();
        table.boolean('checado').default(false)
        table.integer('checklistId').references('id').inTable('checklists').notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('checklist_itens')
};