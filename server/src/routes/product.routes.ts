import { Router } from "express";
import { ProductsFileRepository } from "../repositories/products_repository/productsFile.repository";
import { ProductsController } from "../controllers/products.controller";

const routerProducts = Router();
const productsController = new ProductsController(new ProductsFileRepository());

routerProducts.get("/", productsController.getAll);
routerProducts.get("/:id", productsController.getById);
routerProducts.post("/", productsController.create);
routerProducts.put("/:id", productsController.update);
routerProducts.delete("/:id", productsController.delete);

export default routerProducts;
