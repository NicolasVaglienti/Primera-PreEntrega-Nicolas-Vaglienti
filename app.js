import express from "express";
import productManager from "./ProductManager.js";

const app = express();

app.get("/products", (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts({ limit });

  console.log(products);

  if (!products) {
    res.send("hubo un error");
  }

  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  const params = req.params;
  console.log(params);
  const product = await productManager.getProductsById(Number(params.id));
  console.log(product);
  res.json(product);
});

app.listen(3000, () => console.log("Listening on port 3000"));
