exports.up = knex => knex.schema.createTable("users", table => {
  table.increments("id");
  table.text("name");
  table.text("email");
  table.text("password");
  table.boolean("is_admin").defaultTo(false);
});

exports.down = knex => knex.schema.dropTable("users");
