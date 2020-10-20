
exports.up = function(knex) {
    return knex.schema.createTable('corretivas', table => {
        table.increments('id').primary()
        table.string('data').notNull()
        table.string('problema').notNull()
        table.string('solucao').notNull()
        table.integer('equipamentoId').references('id')
            .inTable('equipamentos').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('corretivas')
};
