import { Request, Response } from "express";
import { VehicleRepository } from "../repositories/vehicle.repository";
import { HTTP_RESPONSE_CODE } from "../utils/httpCodeReponses";

export class VehicleController {
    constructor(private readonly vehicleRepo: VehicleRepository) {}

    public getAll = async (req: Request, res: Response) => {
        try {
            const vehicles = await this.vehicleRepo.getAll();
            return res.json(vehicles);
        } catch (err) {
            console.error(err);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Some error" });
        }
    };

    public getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const vehicle = await this.vehicleRepo.getById(id);
            if (!vehicle) {
                return res
                    .status(HTTP_RESPONSE_CODE.NOT_FOUND)
                    .json({ error: "Vehiculo no encontrado" });
            }

            return res.json(vehicle);
        } catch (err) {
            console.error(err);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Some error" });
        }
    };

    public create = async (req: Request, res: Response) => {
        try {
            const nuevoVehiculo = req.body;
            const vehiculoCreado = await this.vehicleRepo.create(nuevoVehiculo);
            return res.status(HTTP_RESPONSE_CODE.CREATED).json(vehiculoCreado);
        } catch (error) {
            console.error(error);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Error al crear vehiculo" });
        }
    };

    public update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const dataToUpdate = req.body;
            const vehiculoActualizado = await this.vehicleRepo.update(
                id,
                dataToUpdate
            );
            if (!vehiculoActualizado) {
                return res
                    .status(HTTP_RESPONSE_CODE.NOT_FOUND)
                    .json({ error: "Vehiulo no encontrado" });
            }
            return res.json(vehiculoActualizado);
        } catch (error) {
            console.error(error);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Error al actualizar vehiculo" });
        }
    };

    public delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const eliminado = await this.vehicleRepo.delete(id);
            if (!eliminado) {
                return res
                    .status(HTTP_RESPONSE_CODE.NOT_FOUND)
                    .json({ error: "Vehiculo no encontrado" });
            }
            return res.status(HTTP_RESPONSE_CODE.NO_CONTENT).send();
        } catch (error) {
            console.error(error);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Error al eliminar vehiculo" });
        }
    };
}
