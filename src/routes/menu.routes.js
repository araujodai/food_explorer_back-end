const { Router } = require('express');

const MenuController = require('../controllers/MenuController');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureIsAdmin = require("../middlewares/ensureIsAdmin");

const menuRoutes = Router();

const menuController = new MenuController();

menuRoutes.use(ensureAuthenticated);

menuRoutes.get("/", menuController.index);
menuRoutes.post("/", ensureIsAdmin, menuController.create);
menuRoutes.get("/:id", menuController.show);
menuRoutes.put("/:id", ensureIsAdmin, menuController.update);
menuRoutes.delete("/:id", ensureIsAdmin, menuController.delete);

module.exports = menuRoutes;
