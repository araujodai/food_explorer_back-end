const { Router } = require('express');

const MenuController = require('../controllers/MenuController');

const menuRoutes = Router();

const menuController = new MenuController();

menuRoutes.post("/:user_id", menuController.create);
menuRoutes.get("/:id", menuController.show);

module.exports = menuRoutes;
