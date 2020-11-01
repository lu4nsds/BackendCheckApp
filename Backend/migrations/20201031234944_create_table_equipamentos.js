exports.up = function(knex, Promise) {
    return knex.schema.createTable('equipamentos', table =>{
      table.increments('id').primary()
      table.string('name').notNull()
      table.integer('tipo_equipId').references('id')
        .inTable('tipo_equip').notNull()
      table.string('imgUrl')
      table.string('modelo')
      table.string('fabricante')
      table.string('sn').notNull().unique()
      table.integer('hospitalId').references('id')
        .inTable('hospitais').notNull()
  
    })
  };
  
  exports.down = function(knex,Promise) {
      return knex.schema.dropTable('equipamentos')
  };
