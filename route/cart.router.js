import { Router } from "express";
import * as controller from "../controller/cart.controller.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.post("/:cartId/products/:prodId", controller.addProdToCart);
router.delete("/:cartId/products/:prodId", controller.removeProdFromCart);
router.put("/:cartId/products/:prodId", controller.updProdQtyFromCart);
router.delete("/clear/:cartId", controller.cleanCart);

export default router;
