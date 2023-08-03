exports.up = knex => knex.schema.createTable("menu", table => {
  table.increments("id");
  table.text("name").notNullable();
  table.text("description");
  table.decimal("price", 10, 2).notNullable();
  table.text("category").notNullable();
  table.text("image").default(null);
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("menu");
