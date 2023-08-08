const { Router } = require('express');

const MenuController = require('../controllers/MenuController');

const menuRoutes = Router();

const menuController = new MenuController();

menuRoutes.get("/", menuController.index);
menuRoutes.post("/:user_id", menuController.create);
menuRoutes.get("/:id", menuController.show);
menuRoutes.delete("/:id", menuController.delete);

module.exports = menuRoutes;
