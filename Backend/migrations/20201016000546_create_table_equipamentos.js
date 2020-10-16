exports.up = function(knex, Promise) {
  return knex.schema.createTable('equipamentos', table =>{
    table.increments('id').primary()
    table.string('imgUrl')
    table.string('modelo')
    table.string('fabricante')
    table.string('sn').notNull().unique()
    table.binary('content').notNull()
    table.integer('userId').references('id')
        .inTable('users').notNull()
    table.integer('hospitalId').references('id')
        .inTable('hospitais').notNull()

  })
};

exports.down = function(knex,Promise) {
    return knex.schema.dropTable('equipamentos')
};
