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
    const cart = await cartDao.create(cartObj);
    return cart;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// update
export const update = async (cartId, cartObj) => {
  try {
    const cart = await cartDao.getById(cartId, cartObj);
    return cart;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

///remove
export const remove = async (cartId) => {
  try {
    const cart = await cartDao.remove(cartId);
    return cart;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// add prod
export const addProdToCart = async (cartId, prodId) => {
  try {
    const existCart = await getById(cartId);
    if (!existCart) return null;

    const existProd = await prodDao.getById(prodId);
    if (!existProd) return null;

    const cart = await cartDao.addProdToCart(cartId, prodId);
    return cart;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// remove prod
export const removeProdFromCart = async (cartId, prodId) => {
  try {
    const existCart = await getById(cartId);
    if (!existCart){
        return null;
    }    
    const existProdInCart = await cartDao.existProdInCart(cartId, prodId);
    console.log("existProdInCart", existProdInCart)
    if (!existProdInCart){
        return null;
        console.log("prod no ")
        
    } 

    const cart = await cartDao.removeProdFromCart(cartId, prodId);
    return cart;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// update prod cant
export const updProdQtyFromCart = async (cartId, prodId) => {
  try {
    const existCart = await getById(cartId);
    if (!existCart) return null;
    const existProdInCart = await cartDao.existProdInCart(cartId, prodId);
    if (!existProdInCart) return null;

    const cart = await cartDao.updProdQtyFromCart(cartId, prodId);
    return cart;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

/// limpiar cart
export const cleanCart = async (cartId, prodId) => {
    try {
      const existCart = await getById(cartId);
      if (!existCart) return null;
  
      const cart = await cartDao.cleanCart(cartId, prodId);
      return cart;
    } catch (error) {
      console.log("error: ", error.message);
    }
  };