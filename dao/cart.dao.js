import { CartModel } from "./model/cart.model.js";

export default class CartDaoMongoDB {
  /// getAll
  async getAll() {
    try {
      return await CartModel.find({});
    } catch (error) {
      console.log(error);
    }
  }

  /// getById
  async getById(id) {
    try {
      return await CartModel.findById(id).populate("products.prod");
    } catch (error) {
      console.log(error);
    }
  }

  /// create
  async create() {
    try {
      return await CartModel.create({
        products: [],
      });
    } catch (error) {
      console.log(error);
    }
  }

  /// update
  async update(id, obj) {
    try {
      const response = await CartModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  ///remove
  async remove(id) {
    try {
      return await CartModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  async existProdInCart(cartId, prodId){
    try {
      return await CartModel.findOne({
        _id: cartId,
        products: { $elemMatch: { prod: prodId } }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /// add prod
  async addProdToCart(cartId, prodId) {
    try {
      const existProdInCart = await this.existProdInCart(cartId, prodId);
        if(existProdInCart){
          return await CartModel.findOneAndUpdate(
            { _id: cartId, 'products.prod': prodId },
            { $set: { 'products.$.quantity': existProdInCart.products[0].quantity + 1 } },
            { new: true }
          );
        } else {
          return await CartModel.findByIdAndUpdate(
            cartId,
            { $push: { products: { prod: prodId } } },
            { new: true }
          )
        }
    } catch (error) {
      console.log(error);
    }
  }

  /// remove prod
  async removeProdFromCart(cartId, prodId) {
    try {
        console.log("cartId ", cartId);
        console.log("prodId ",prodId);
      return await CartModel.findByIdAndUpdate(
        { _id: cartId },
        { $pull: { products: { prod: prodId } } },
        { new: true }
      )
    } catch (error) {
      console.log(error);
    }
  }

  /// update prod cant
  async updProdQtyFromCart(cartId, prodId, quantity) {
    try {
      return await CartModel.findOneAndUpdate(
        { _id: cartId, 'products.prod': prodId },
        { $set: { 'products.$.qty': quantity } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

  /// limpiar cart
  async cleanCart(cartId) {
    try {
        console.log("cartId",cartId);
     return await CartModel.findOneAndUpdate(
      { _id: cartId },
      { $set: { products: [] } },
      { new: true }
     )
    } catch (error) {
      console.log(error);
    }
  }
}
