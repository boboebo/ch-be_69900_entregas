import CartDaoMongoDB from "../dao/cart.dao.js";
import ProductDaoMongoDB from "../dao/product.dao.js";
const cartDao = new CartDaoMongoDB();
const prodDao = new ProductDaoMongoDB();

/// getAll
export const getAll = async () => {
  try {
    const carts = await cartDao.getAll();
    return carts;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// getById
export const getById = async (id) => {
  try {
    const cart = await cartDao.getById(id);
    return cart;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// create
export const create = async (cartObj) => {
  try {
    const cart = await cartDao.getById(cartObj);
    return cart;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// update
export const update = async (idCart, cartObj) => {
  try {
    const cart = await cartDao.getById(idCart, cartObj);
    return cart;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

///remove
export const remove = async (idCart) => {
  try {
    const cart = await cartDao.remove(idCart);
    return cart;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// add prod
export const addProdToCart = async (idCart, idProd) => {
  try {
    const existCart = await getById(cartId);
    if (!existCart) return null;

    const existProd = await prodDao.getById(prodId);
    if (!existProd) return null;

    const cart = await cartDao.addProdToCart(idCart, idProd);
    return cart;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// remove prod
export const removeProdFromCart = async (idCart, idProd) => {
  try {
    const existCart = await getById(cartId);
    if (!existCart) return null;
    const existProdInCart = await cartDao.existProdInCart(cartId, prodId);
    if (!existProdInCart) return null;

    const cart = await cartDao.removeProdFromCart(idCart, idProd);
    return cart;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// update prod cant
export const updProdQtyFromCart = async (idCart, idProd) => {
  try {
    const existCart = await getById(cartId);
    if (!existCart) return null;
    const existProdInCart = await cartDao.existProdInCart(cartId, prodId);
    if (!existProdInCart) return null;

    const cart = await cartDao.updProdQtyFromCart(idCart, idProd);
    return cart;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// limpiar cart
export const cleanCart = async (idCart, idProd) => {
    try {
      const existCart = await getById(cartId);
      if (!existCart) return null;
  
      const cart = await cartDao.cleanCart(idCart, idProd);
      return cart;
    } catch (error) {
      console.log("error: ", error.message);
    }
  };