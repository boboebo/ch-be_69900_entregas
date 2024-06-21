import express from 'express';
import productRouter from './route/product.router.js';
import cartRouter from './route/cart.router.js';
import { dbConnect } from './db/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use('/product', productRouter);
app.use('/cart', cartRouter);

dotenv.config();

dbConnect();

app.listen(8080, () => {
  console.log(`Escuchando en el puerto 8080`);
});
