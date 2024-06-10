const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class MenuController {
  async create(request, response) {
    const { name, description, price, category, ingredients } = request.body;
    const imageUploaded = request.file ? request.file.filename : null;

    if (!name || !description || !price || !category || !ingredients) {
      throw new AppError("Preencha todos os campos.");
    };

    if (imageUploaded) {
      const diskStorage = new DiskStorage();
      await diskStorage.saveFile(imageUploaded);
    };

    const [menu_id] = await knex("menu").insert({
      name,
      description,
      price,
      category,
      image: imageUploaded,
    });

    const ingredientsInsert = JSON.parse(ingredients).map(name => {
      return {
        menu_item_id: menu_id,
        name,
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

    const diskStorage = new DiskStorage();

    const menu_item = await knex("menu").where({ id }).first();

    if (!menu_item) {
      throw new AppError("Item do menu não encontrado.");
    };

    const updatedName = name || menu_item.name;
    const updatedDescription = description || menu_item.description;
    const updatedPrice = price !== undefined ? price : menu_item.price;
    const updatedCategory = category || menu_item.category;
    const updatedImage = request.file ? request.file.filename : menu_item.image;

    if (request.file) {
      if (menu_item.image) {
        await diskStorage.deleteFile(menu_item.image);
      };
      await diskStorage.saveFile(updatedImage);
    };

    await knex("menu").where({ id }).update({
      name: updatedName,
      description: updatedDescription,
      price: updatedPrice,
      category: updatedCategory,
      image: updatedImage,
      updated_at: knex.fn.now(),
    });

    if (ingredients) {
      const ingredientsArray = Array.isArray(ingredients) ? ingredients : JSON.parse(ingredients);
      const ingredientsUpdate = ingredientsArray.map((name) => ({
        menu_item_id: id,
        name,
      }));

      await knex("ingredients").where({ menu_item_id: id }).delete();
      await knex("ingredients").insert(ingredientsUpdate);
    }

    return response.json();
  };

  async delete(request, response) {
    const { id } = request.params;

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