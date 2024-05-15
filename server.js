import express from 'express';
//import cartRouter from './route/cartRouter.js'
import productsRouter from './route/product.router.js';
// import morgan from 'morgan';
// import { __dirname } from './path.js';
// import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// app.use(express.static(__dirname + '/public'))
// app.use(express.urlencoded({extended:true}))
// app.use(morgan('dev'))
app.use(express.json())

//app.use('/api/carts', cartRouter);
app.use('/product', productsRouter);

//app.use(errorHandler);

app.listen(8080,()=>{
    console.log(`Escuchando en el puerto 8080`)
})
