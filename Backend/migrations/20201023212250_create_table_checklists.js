exports.up = function(knex) {
    return knex.schema.createTable('checklists', table => {
        table.increments('id').primary()
        table.integer('equipamentoId').references('id').inTable('equipamentos').notNull();
        table.integer('manutencaoId').references('id')
            .inTable('manutencoes').notNull()
            
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('checklists')
};