exports.up = function(knex) {
    return knex.schema.createTable('manutencoes', table => {
        table.increments('id').primary()
        table.string('data').notNull()
        table.string('problema')
        table.string('solucao')
        table.integer('equipamentoId').references('id')
            .inTable('equipamentos').notNull()
        table.integer('checklistId').references('id')
            .inTable('checklists') 
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.integer('tipo').notNull()
        table.string('observacoes')
        table.string('horasTrabalhadas') //MUDAR PARA HORAS TOTAIS


    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('manutencoes')
};
