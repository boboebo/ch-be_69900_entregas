import { ProductModel } from "./model/product.model.js";

export default class ProductDaoMongoDB {
  async getAll(page = 1, limit = 10, category, sort) {
    try {
      const filter = category ? { category: category } : {};
      let sortOrder = {};
      if (sort) {
        sortOrder.price = sort === "asc" ? 1 : -1;
      }
      const prods = await ProductModel.paginate(filter, {
        page,
        limit,
        sort: sortOrder,
      });
      return prods;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const prod = await ProductModel.findById(id);
      return prod;
    } catch (error) {
      console.log(error);
    }
  }

  async create(prodNew) {
    try {
      console.log("prodNew -> ", prodNew);
      const prod = await ProductModel.create(prodNew);
      return prod;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, prodUpd) {
    try {
      const prod = ProductModel.findByIdAndUpdate(id, prodUpd, {
        new: true,
      });
      return prod;
    } catch (error) {
      console.log(error);
    }
  }

  async del(id) {
    try {
      const response = ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
