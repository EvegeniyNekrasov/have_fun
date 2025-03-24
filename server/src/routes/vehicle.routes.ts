import { Router } from "express";
import { VehicleFileRepository } from "../repositories/vehicle_repository/vehicleFile.repository";
import { VehicleController } from "../controllers/vehicles.controller";

const routerVehicle = Router();
const vehicleRepository = new VehicleFileRepository();
const vehicleController = new VehicleController(vehicleRepository);

routerVehicle.get("/", vehicleController.getAll);
routerVehicle.get("/:id", vehicleController.getById);
routerVehicle.post("/", vehicleController.create);
routerVehicle.put("/:id", vehicleController.update);
routerVehicle.delete("/:id", vehicleController.delete);

export default routerVehicle;
