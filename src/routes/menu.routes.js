const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const MenuController = require('../controllers/MenuController');

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureIsAdmin = require("../middlewares/ensureIsAdmin");

const menuRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const menuController = new MenuController();

menuRoutes.use(ensureAuthenticated);

menuRoutes.post("/", ensureIsAdmin, upload.single("image"), menuController.create);
menuRoutes.get("/", menuController.index);
menuRoutes.get("/:id", menuController.show);
menuRoutes.put("/:id", ensureIsAdmin, upload.single("image"), menuController.update);
menuRoutes.delete("/:id", ensureIsAdmin, menuController.delete);

module.exports = menuRoutes;
