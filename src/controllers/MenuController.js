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

  async show(request, response) {
    const { id } = request.params;

    const menu_item = await knex("menu").where({ id }).first();
    const ingredients = await knex("ingredients").where({ menu_item: id }).orderBy("name");

    return response.json({
      ...menu_item,
      ingredients
    });

  };

  async delete(request, response) {
    const { user_id, id } = request.params;

    const user = await knex("users").where({ id: user_id }).first();
    const isAdmin = user.is_admin;

    if (!isAdmin) {
      throw new AppError("Esse usuário não está autorizado a realizar esta ação.");
    };

    await knex("ingredients").where({ menu_item: id }).delete();
    await knex("menu").where({ id }).delete();

    return response.json();
  };

};

module.exports = MenuController;