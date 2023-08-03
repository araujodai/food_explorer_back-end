exports.up = knex => knex.schema.createTable("ingredients", table => {
  table.increments("id");
  table.integer("menu_item").references("id").inTable("menu").onDelete("CASCADE");
  table.text("name").notNullable();
});

exports.down = knex => knex.schema.dropTable("ingredients");
