import express from 'express';
import productRouter from './route/product.router.js';
import { dbConnect } from './db/db.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use('/product', productRouter);

dbConnect();

app.listen(8080, () => {
  console.log(`Escuchando en el puerto 8080`);
});
