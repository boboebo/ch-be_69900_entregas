import { Router } from "express";
import ProductManager from "../manager/productManager.js";
import { validateProd } from "../middleware/validateProd.js";

const createProductsRouter = (io) => {
  const router = Router();
  const path = "data/products.json";
  const pm = new ProductManager(path);

  // get de productos
  router.get("/", async (req, res) => {
    const { limit } = req.query;
    const products = await pm.getProducts(limit);
    res.status(200).json(products);
  });

  // get producto by id
  router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    const product = await pm.getProductById(pid);
    res.status(200).json(product);
  });

  // post add producto
  router.post("/", validateProd, async (req, res) => {
    const product = req.body;
    console.log("product en post -> ", product);
    const productCreated = pm.createProduct(product);
    io.emit('productCreated', productCreated);
    res.json(productCreated);
  });

  // put update product by id
  router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const prodUpd = await pm.updateProduct(pid, req.body);
    if (!prodUpd) res.status(404).json({ msg: "Error updating prod" });
    res.status(200).json(prodUpd);
  });

  //delete product by id
  router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    const product = await pm.deleteProductById(pid);
    io.emit('productDeleted', pid);
    res.status(200).json(product);
  });

  // ruta para mostrar en vista la lista de productos
  router.get("/listaRTProductos", (req, res) => {
    console.log("tomaaaaa");
    res.render("home");
  });

  return router;
};

export default createProductsRouter;
