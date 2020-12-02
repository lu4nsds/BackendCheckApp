exports.up = function(knex, Promise) {
    return knex.schema.createTable('equipamentos', table =>{
      table.increments('id').primary()
      table.string('name').notNull()
      table.integer('tipos_equipId').references('id')
        .inTable('tipos_equip').notNull()
      table.string('imgUrl')
      table.string('modelo')
      table.string('fabricante')
      table.string('sn').notNull().unique()
      table.integer('hospitalId').references('id')
        .inTable('hospitais').notNull()
      table.string('departamento')    
    })
  };
  
  exports.down = function(knex,Promise) {
      return knex.schema.dropTable('equipamentos')
  };
