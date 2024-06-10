exports.up = knex => knex.schema.createTable("orders", table => {
  table.increments("id");
  table.integer("user_id").references("id").inTable("users");
  table.decimal("total_price", 10, 2);
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.text("payment_method");
  table.text("status");
});

exports.down = knex => knex.schema.dropTable("orders");
