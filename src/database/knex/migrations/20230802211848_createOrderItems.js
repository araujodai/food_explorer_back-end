exports.up = knex => knex.schema.createTable("order_items", table => {
  table.increments("id");
  table.integer("order_id").references("id").inTable("orders");
  table.integer("menu_item_id").references("id").inTable("menu");
  table.integer("quantity");
});

exports.down = knex => knex.schema.dropTable("order_items");
