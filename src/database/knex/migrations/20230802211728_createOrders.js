exports.up = knex => knex.schema.createTable("orders", table => {
  table.increments("id");
  table.integer("user_id").references("id").inTable("users");
  table.decimal("price", 10, 2);
  table.timestamp("created_at").default(knex.fn.now());
  table.text("status");
});

exports.down = knex => knex.schema.dropTable("orders");
