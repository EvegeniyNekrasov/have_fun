import { Router } from "express";
import { DriversFileRepository } from "../repositories/drivers_repository/driversFile.repository";
import { DriversController } from "../controllers/drivers.controller";

const routerDrivers = Router();
const driversReposotory = new DriversFileRepository();
const driversController = new DriversController(driversReposotory);

routerDrivers.get("/", driversController.getAll);
routerDrivers.get("/:id", driversController.getById);
routerDrivers.post("/", driversController.create);
routerDrivers.put("/:id", driversController.update);
routerDrivers.delete("/:id", driversController.delete);

export default routerDrivers;
