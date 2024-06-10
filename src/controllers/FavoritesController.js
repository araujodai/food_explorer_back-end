const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class FavoritesController {
  async create(request, response) {
    const user_id = request.user.id;
    const { menu_item_id } = request.params;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    };

    const menu_item = await knex("menu").where({ id: menu_item_id }).first();
    
    if (!menu_item) {
      throw new AppError("Produto não encontrado.");
    };

    const [favorite_id] = await knex("favorites").insert({
      user_id,
      menu_item_id
    });

    return response.status(201).json(favorite_id);
  };

  async index(request, response) {
    const user_id = request.user.id;

    const user_favorites = await knex("favorites")
      .select(
        "favorites.id as id",
        "menu.id as menu_item_id",
        "menu.name as menu_item_name",
        "menu.image as menu_item_image",
      )
      .innerJoin("menu", "menu_item_id", "menu.id")
      .where({ user_id });

    return response.json(user_favorites);
  };

  async delete(request, response) {
    const user_id = request.user.id; 
    const { menu_item_id } = request.params;

    await knex("favorites").where({ 
      user_id,
      menu_item_id,
     }).delete();

    return response.status(204).json();
  };
};

module.exports = FavoritesController;