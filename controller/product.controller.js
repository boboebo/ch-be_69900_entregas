// controller/product.controller.js
import * as service from "../service/product.service.js";

export const getAll = async (req, res) => {
  try {
    const { page, limit, category, sort } = req.query;
    const response = await service.getAll(page, limit, category, sort);
    const nextLink = response.hasNextPage
      ? `http://localhost:8080/products?page=${response.nextPage}`
      : null;
    const prevLink = response.hasPrevPage
      ? `http://localhost:8080/products?page=${response.prevPage}`
      : null;
    res.status(200).json({
      status: "success",
      payload: response.docs,
      totalPages: response.totalDocs,
      prevPage: response.prevPage,
      nextPage: response.nextPage,
      page,
      hasNextPage: response.hasNextPage,
      hasPrevPage: response.hasPrevPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    console.log("Controller: error getting products:", error);
  }
};

/// get product by id
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prod = await service.getById(id);
    if (!prod) {
      res.status(404).json({ msg: "Product Not found!" });
    } else {
      res.status(200).json(prod);
    }
  } catch (error) {
    next(error.message);
  }
};

/// create product
export const create = async (req, res, next) => {
  try {
    const prod = await service.create(req.body);
    if (!prod) {
      res.status(404).json({ msg: "Error create product!" });
    } else {
      res.status(200).json(prod);
    }
  } catch (error) {
    next(error.message);
  }
};

/// update product
export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prod = await service.update(id, req.body);
    if (!prod) {
      res.status(204).json({ msg: "Could not update product!" });
    } else {
      res.status(201).json(prod);
    }
  } catch (error) {
    next(error.message);
  }
};

/// delete product
export const del = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prod = await service.del(id);
    if (!prod) {
      res.status(204).json({ msg: "Could not delete product!" });
    } else {
      res.status(200).json(prod);
    }
  } catch (error) {
    next(error.message);
  }
};
