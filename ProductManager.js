class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (this.products.find((p) => p.code === code)) {
      return console.log("Error: Codigo ya existe.");
    } else if (!title) {
      return console.log("Error: titulo es requerido.");
    } else if (!description) {
      return console.log("Error: descripción es requerida.");
    } else if (!price) {
      return console.log("Error: precio es requerido.");
    } else if (!thumbnail) {
      return console.log("Error: thumbnail es requerido.");
    } else if (!code) {
      return console.log("Error: codigo es requerido.");
    } else if (!stock) {
      return console.log("Error: stock es requerido.");
    }

    let product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.products.length + 1,
    };

    this.products.push(product);
  }
  getProducts() {
    return this.products;
  }

  getProductsById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      return console.log("Error: Not found");
    }
    return product;
  }
}

let minm = 1;
let maxm = 10;

let productManager = new ProductManager();
productManager.addProduct(
  "Product",
  "decription",
  100,
  "thumbnail",
  Math.floor(Math.random() * (maxm - minm + 1)) + minm,
  15
);
productManager.addProduct(
  "Product",
  "decription",
  100,
  "thumbnail",
  Math.floor(Math.random() * (maxm - minm + 1)) + minm,
  15
);

console.log(productManager.getProducts());
console.log(productManager.getProductsById(1));
