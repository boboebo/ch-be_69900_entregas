import { Schema, model } from "mongoose";

export const cartSchema = new Schema({
    products: [
      {
        _id: false,
        qty: {
          type: Number,
          default: 1 
        },
        prod: {
          type: Schema.Types.ObjectId,
          ref: "products" // Referencia al modelo de productos
        }
      }
    ]
  });

export const CartModel = model("carts", cartSchema);
