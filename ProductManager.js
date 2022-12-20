import fs from "fs";

const writeFile = async (path, contents) =>
  await fs.promises.writeFile(path, JSON.stringify(contents, null, 2));

const readFile = async (path) => {
  const data = await fs.promises.readFile(path, "utf8");
  return JSON.parse(data);
};

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    try {
      this.products = fs.readFileSync(filePath);
      this.products = JSON.parse(this.products);
    } catch (err) {
      this.products = [];
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
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
      await writeFile(this.path, this.products);
    } catch (error) {
      console.log("Error linea 49", error);
    }
  }

  getProducts({ limit }) {
    if (limit) {
      this.products = this.products.slice(0, Number(limit));
    }
    return this.products;
  }

  async updateProduct(product) {
    try {
      this.products = this.products.map((p) => {
        if (p.id === product.id) {
          return {
            ...p,
            ...product,
          };
        }
        return p;
      });
      await writeFile(this.path, this.products);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    this.products = this.products.filter((p) => p.id !== id);
    await writeFile(this.path, this.products);
  }

  async getProductsById(id) {
    try {
      this.products = await readFile(this.path);
      console.log(this.products);
      const product = this.products.find((p) => p.id === id);
      if (!product) {
        return console.log("Error: Not found");
      }
      return product;
    } catch (error) {
      console.log("Error linea 73", error);
    }
  }
}

// let minm = 1;
// let maxm = 100;

// for (let i = 0; i < 5; i++) {
//   productManager.addProduct(
//     "Product",
//     "decription",
//     100,
//     "thumbnail",
//     Math.floor(Math.random() * (maxm - minm + 1)) + minm,
//     15
//   );
// }

// productManager.updateProduct({
//   title: "Product",
//   description: "nueva asdasasddescripcion",
//   price: 100,
//   thumbnail: "thumbnail",
//   code: 6,
//   stock: 15,
//   id: 3,
// });

// Descomentar los logs si es necesario.

// console.log(productManager.getProducts());
// console.log(productManager.getProductsById(1));
// productManager.deleteProduct(2);

export default new ProductManager("./Products.json");
