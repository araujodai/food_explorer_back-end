const knex = require("../database/knex");

class OrdersController {
  async create(request, response) {
    const user_id = request.user.id;
    const { cart_items, amount, payment_method } = request.body;

    const [order_id] = await knex("orders").insert({
        user_id: user_id,
        total_price: amount,
        payment_method,
        status: "pending",
    });

    const itemsInsert = cart_items.map(item => {
      return {
        order_id,
        menu_item_id: item.id,
        quantity: item.quantity,
      }
    });

    await knex("order_items").insert(itemsInsert);

    return response.status(201).json({ order_id });
  };

  async update(request, response) {
    const { id, status } = request.body;

    await knex("orders").where({ id }).first().update({
        status,
    });

    return response.status(200).json();
  };

  async index(request, response) {
    const { status } = request.query;
    const user_id = request.user.id;

    let orders;

    const user = await knex("users").where({ id: user_id }).first();

    if (user.is_admin) {
      if (status) {
        orders = await knex("orders")
          .where({ status })
          .orderBy("created_at", "desc");
      } else {
        orders = await knex("orders")
          .orderBy("created_at", "desc");
      };

    } else {
      orders = await knex("orders")
        .where({ user_id })
        .orderBy("created_at", "desc");
    };

    const ordersWithItems = await Promise.all(orders.map(async order => {
      const items = await knex("order_items")
        .select(
          "menu_item_id", 
          "quantity",
          "menu.name as menu_item_name",
          )
        .innerJoin("menu", "order_items.menu_item_id", "menu.id")
        .where({ order_id: order.id });

      return {
        ...order,
        items,
      };
    }));

    return response.json(ordersWithItems);
  };

  async show(request, response) {
    const { id } = request.params;

    const order = await knex("orders")
      .where({ id })
      .first();
  
    const order_items = await knex("order_items")
      .select(
        "order_items.id",
        "order_items.quantity",
        "menu.name as name",
        "menu.price as price",
        "menu.image as image",
      )
      .innerJoin("menu", "order_items.menu_item_id", "menu.id")
      .where({ order_id: id });
  
    return response.json({
      ...order,
      order_items,
    });  
  };

};

module.exports = OrdersController;