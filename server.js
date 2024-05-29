import express from "express";
import cartRouter from "./route/cart.router.js";
import createProductsRouter from "./route/product.router.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(
  express.static(__dirname + "/public", {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

app.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts");
});

app.get("/", (req, res) => {
  res.render("home");
});

const httpServer = app.listen(8080, () => {
  console.log(`Escuchando en el puerto 8080`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {    
  console.log(`user conectado ${socket.id}`);
  socket.emit("loadProducts", "Cargando productos...");

  socket.on("newProducto", async (prod) => {
    try {
      const response = await fetch('http://localhost:8080/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(prod)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const productCreated = await response.json();
      console.log('Producto creado:', productCreated);

      io.emit('productCreated', productCreated);

    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  });

  socket.on("deleteProducto", async (id) => {
    console.log(`El elemento ${id} será eliminado`);
    try {
      const response = await fetch(`http://localhost:8080/api/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const productDeleted = await response.json();
      console.log('Producto eliminado:', productDeleted);
      io.emit('productDeleted', id);

    } catch (error) {
      console.error('Error al borrar el producto:', error);
    }
  });
});

app.use("/api/cart", cartRouter);
app.use("/api/product", createProductsRouter(socketServer));