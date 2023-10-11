const { Router } = require("express");

const usersRoutes = require("./users.routes");
const menuRoutes = require("./menu.routes");
const sessionsRoutes = require("./sessions.routes");
const favoritesRoutes = require("./favorites.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/menu", menuRoutes);
routes.use("/favorites", favoritesRoutes);

module.exports = routes;