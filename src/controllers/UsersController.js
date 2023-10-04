const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userAlreadyExists = await knex("users").where({ email }).first();

    if (userAlreadyExists) {
      throw new AppError("O e-mail informado já está em uso.")
    };

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      // is_admin
    })

    response.status(201).json();
  };

  async update(request, response) {
    const { name, email, password, new_password } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    };

    const userWithUpdatedEmail = await knex("users").where({ email }).first();

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    };

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (new_password && !password) {
      throw new AppError("Informe a senha atual para definir uma nova.");
    };

    if (new_password && password) {
      const checkPassword = await compare(password, user.password);

      if (!checkPassword) {
        throw new AppError("A senha atual está incorreta, verifique e tente novamente.");
      };

      user.password = await hash(new_password, 8);
    };

    await knex("users").where({ id: user_id }).update({
      name: user.name,
      email: user.email,
      password: user.password
    })

    return response.status(200).json();
  };
};

module.exports = UsersController;