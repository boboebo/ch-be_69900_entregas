import { Router } from "express";
import * as controller from "../controller/cart.controller.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.post("/:idCart/products/:idProd", controller.addProdToCart);
router.delete("/:idCart/products/:idProd", controller.removeProdFromCart);
router.put("/:idCart/products/:idProd", controller.updProdQtyFromCart);
router.delete("/clear/:idCart", controller.cleanCart);

export default router;
