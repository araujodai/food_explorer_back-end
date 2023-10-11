const knex = require("../database/knex");
const AppError = require("../utils/AppError");

async function ensureIsNotAdmin(request, response, next) {
  const user_id = request.user.id;
  const user = await knex("users").where({ id: user_id }).first();

  if (!user || user.is_admin) {
    throw new AppError("Usuário não autorizado.", 401);
  }

  return next();
};

module.exports = ensureIsNotAdmin;