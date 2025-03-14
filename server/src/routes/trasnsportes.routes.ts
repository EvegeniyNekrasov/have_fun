import { Router } from "express";
import { TransporteFileRepository } from "../repositories/transporteFile.repository";
import { TransporteController } from "../controllers/transportes.controller";

const routerTransportes = Router();
const transportesRepository = new TransporteFileRepository();
const transportesController = new TransporteController(transportesRepository);

routerTransportes.get("/", transportesController.getAll);
routerTransportes.get("/:id", transportesController.getById);
routerTransportes.post("/", transportesController.create);
routerTransportes.put("/:id", transportesController.update);
routerTransportes.delete("/:id", transportesController.delete);

export default routerTransportes;
