import fs from "fs";
import { v4 } from "uuid";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts = () => {
    try {
      if (fs.existsSync(this.path)) {
        const products = fs.readFileSync(this.path, "utf8");
        return JSON.parse(products);
      } else return ["notfound"];
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = (pid) => {
    try {
      if (fs.existsSync(this.path)) {
        const products = this.getProducts();
        const product = products.find((prod) => prod.id == pid);
        return product;
      } else return ["notfound"];
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = (prod) => {
    const product = {
      id: v4(),
      status: true,
      ...prod,
    };
    const products = this.getProducts();
    products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(products));
  };

  updateProduct = (pid, prod) => {
    //get prodById
    const prodById = this.getProductById(pid);

    //UpdatedProd = update prodById with prod
    prodById.title = prod.title;
    prodById.description = prod.description;
    prodById.code = prod.code;
    prodById.price = prod.price;
    prodById.stock = prod.stock;
    prodById.category = prod.category;
    prodById.thumbnails = prod.thumbnails;

    const products = this.getProducts();
    const index = products.findIndex(item => item.id.toString() === pid);
    products[index] = prodById;
    
    //update json
    const jsonProducts = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, jsonProducts);

    return prodById;
  };

  deleteProductById = (pid)=>{
    const prodById = this.getProductById(pid);
    const products = this.getProducts();
    const index = products.findIndex(item => item.id.toString() === pid);
    products.splice(index, 1);
    const jsonProducts = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, jsonProducts);


  }


}
