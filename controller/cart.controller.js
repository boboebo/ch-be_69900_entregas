import * as service from "../service/cart.service.js";

/// getAll
export const getAll = async (req, res, next) => {
  try {
    const carts = await service.getAll();
    if (!carts) {
      res.status(404).json({ message: "could not get carts" });
    } else {
      res.status(200).json(carts);
    }
  } catch (error) {
    next(error.message);
  }
};

/// getById
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await service.getById(id);
    if (!cart) {
      res.status(404).json({ message: "could not get cart" });
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    next(error.message);
  }
};

/// create
export const create = async (req, res) => {
  try {
    const cart = await service.create(req.body);
    if (!cart) {
      res.status(404).json({ message: "could not create cart" });
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    next(error.message);
  }
};

/// update
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await service.update(id, req.body);
    if (!cart) {
      res.status(404).json({ message: "could not update cart" });
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    next(error.message);
  }
};

///remove
export const remove = async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await service.remove(id);
      if (!cart) {
        res.status(404).json({ message: "could not remove cart" });
      } else {
        res.status(200).json(cart);
      }
    } catch (error) {
      next(error.message);
    }
  };
  

/// add prod
export const addProdToCart = async (req, res) => {
    try {
      const { idCart, idProd } = req.params;
      const cart = await service.update(id, req.body);
      if (!cart) {
        res.status(404).json({ message: "could not update cart" });
      } else {
        res.status(200).json(cart);
      }
    } catch (error) {
      next(error.message);
    }
  };
  

/// remove prod

/// update prod cant

/// limpiar cart
