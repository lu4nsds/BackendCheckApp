exports.up = function(knex) {
    return knex.schema.createTable('tarefas', table => {
        table.increments('id').primary()
        table.string('data').notNull()
        table.string('horaInicial').notNull()
        table.string('horaFinal').notNull()
        table.string('horasTrabalhadas')
        table.integer('manutencaoId').references('id')
            .inTable('manutencoes').notNull()


    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tarefas')
};
