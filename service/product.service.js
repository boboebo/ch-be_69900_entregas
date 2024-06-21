// service/product.service.js
import ProductDaoMongoDB from "../dao/product.dao.js";
const prodDao = new ProductDaoMongoDB();

export const getAll = async (page, limit, category, sort) => {
  try {
    const prods = await prodDao.getAll(page, limit, category, sort);
    return prods;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

export const getById = async (id) => {
  try {
    const prod = await prodDao.getById(id);
    return prod;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// create product
export const create = async (prodNew) => {
  try {
    const prod = await prodDao.create(prodNew);
    if (!prod) {
      return false;
    } else {
      return prod;
    }
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// update product
export const update = async (id, prodNew) => {
  try {
    const prod = await prodDao.update(id, prodNew);
    return prod;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// delete product
export const del = async (id) => {
  try {
    const prod = await prodDao.del(id);
    return prod;
  } catch (error) {
    next(error.message);
  }
};
