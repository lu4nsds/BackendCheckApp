exports.up = function(knex) {
    return knex.schema.createTable('itens_status', table => {
        table.increments('id').primary();
        table.string('procedimento').notNull();
        table.boolean('checado').default(false)
        table.integer('manutencaoId').references('id')
            .inTable('manutencoes').notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('itens_status')
};

