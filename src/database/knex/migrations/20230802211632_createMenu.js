exports.up = knex => knex.schema.createTable("menu", table => {
  table.increments("id");
  table.text("name");
  table.text("description");
  table.decimal("price", 10, 2);
  table.text("category");
  table.text("image").defaultTo(null);
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("menu");
