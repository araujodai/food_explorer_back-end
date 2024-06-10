const { Router } = require('express');

const OrdersController = require("../controllers/OrdersController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureIsAdmin = require("../middlewares/ensureIsAdmin");
const ensureIsNotAdmin = require("../middlewares/ensureIsNotAdmin");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.post("/", ensureIsNotAdmin, ordersController.create);
ordersRoutes.put("/", ensureIsAdmin, ordersController.update);
ordersRoutes.get("/", ordersController.index);
ordersRoutes.get("/:id", ordersController.show);

module.exports = ordersRoutes;
