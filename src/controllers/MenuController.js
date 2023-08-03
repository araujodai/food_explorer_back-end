const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MenuController {
  async create(request, response) {
    const { name, description, price, category, ingredients } = request.body;
    const { user_id } = request.params;


    const user = await knex("users").where({ id: user_id }).first();
    const isAdmin = user.is_admin;
    

    if (!isAdmin) {
      throw new AppError("Somente administradores podem criar um novo prato.");
      
    };

    const [menu_id] = await knex("menu").insert({
      name,
      description,
      price,
      category
    });

    const ingredientsInsert = ingredients.map(name => {
      return {
        menu_item: menu_id,
        name
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    response.json();

  };
};

module.exports = MenuController;