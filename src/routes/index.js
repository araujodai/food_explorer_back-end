const { Router } = require("express");

const usersRoutes = require("./users.routes");
const menuRoutes = require("./menu.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/menu", menuRoutes);

module.exports = routes;