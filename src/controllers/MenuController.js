const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MenuController {
  async create(request, response) {
    const { name, description, price, category, ingredients } = request.body;
    // const user_id = request.user.id;


    // const user = await knex("users").where({ id: user_id }).first();
    // const isAdmin = user.is_admin;
    

    // if (!isAdmin) {
    //   throw new AppError("Somente administradores podem criar um novo prato.");
      
    // };
    if (!name || !description || !price || !category || !ingredients) {
      throw new AppError("Preencha todos os campos.");
    }

    const [menu_id] = await knex("menu").insert({
      name,
      description,
      price,
      category
    });

    const ingredientsInsert = ingredients.map(name => {
      return {
        menu_item_id: menu_id,
        name
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json();
  };

  async show(request, response) {
    const { id } = request.params;

    const menu_item = await knex("menu").where({ id }).first();
    const ingredients = await knex("ingredients").where({ menu_item_id: id }).orderBy("name");

    return response.json({
      ...menu_item,
      ingredients
    });

  };

  async update(request, response) {
    const { name, description, price, category, ingredients } = request.body;
    const { id } = request.params;
    // const imageFileName = request.file.filename;


    if (!name || !description || !price || !category || !ingredients) {
      throw new AppError("Preencha todos os campos.");
    }

    await knex("menu").where({ id }).first().update({
      name,
      description,
      price,
      category,
      updated_at: knex.fn.now()
    });

    const ingredientsUpdate = ingredients.map(name => {
      return {
        menu_item_id: id,
        name
      }
    });

    await knex("ingredients").where({ menu_item_id: id }).delete();
    await knex("ingredients").insert(ingredientsUpdate);

    return response.json();
  };

  async delete(request, response) {
    const { id } = request.params;
    // const { user_id } = request.query;

    // const user = await knex("users").where({ id: user_id }).first();
    // const isAdmin = user.is_admin;

    // if (!isAdmin) {
    //   throw new AppError("Esse usuário não está autorizado a realizar esta ação.");
    // };

    await knex("ingredients").where({ menu_item_id: id }).delete();
    await knex("menu").where({ id }).delete();

    return response.status(204).json();
  };

  async index(request, response) {
    const { search } = request.query;

    let menu;

    if (search) {
      menu = await knex("menu")
      .whereLike("name", `%${search}%`)
      .orWhereIn("id", function() {
        this.select("menu_item_id")
        .from("ingredients")
        .whereLike("name", `%${search}%`);
      });

    } else {
      menu = await knex("menu")
    };

    return response.json(menu);
  };

};

module.exports = MenuController;