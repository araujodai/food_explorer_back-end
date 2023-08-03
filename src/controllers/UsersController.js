const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { name, email, password, is_admin } = request.body;

    const userAlreadyExists = await knex("users").where({ email }).first();

    if (userAlreadyExists) {
      throw new AppError("O e-mail informado já está em uso.")
    };

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      is_admin
    })

    response.status(201).json();
  };
};

module.exports = UsersController;