import { Schema, model } from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new Schema({
  id: { type: String },
  status: { type: Boolean, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: String, required: false }
});

ProductSchema.plugin(mongoosePaginate);

export const ProductModel = model('products', ProductSchema);
