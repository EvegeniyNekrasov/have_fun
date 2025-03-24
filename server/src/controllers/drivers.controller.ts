import { Request, Response } from "express";
import { DriversRepository } from "../repositories/drivers_repository/drivers.repository";
import { HTTP_RESPONSE_CODE } from "../utils/httpCodeReponses";

export class DriversController {
    constructor(private readonly driversRepo: DriversRepository) {}

    public getAll = async (req: Request, res: Response) => {
        try {
            const drivers = await this.driversRepo.getAll();
            return res.json(drivers);
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
            const driver = await this.driversRepo.getById(id);
            if (!driver) {
                return res
                    .status(HTTP_RESPONSE_CODE.NOT_FOUND)
                    .json({ error: "Driver no encontrado" });
            }

            return res.json(driver);
        } catch (err) {
            console.error(err);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Some error" });
        }
    };

    public create = async (req: Request, res: Response) => {
        try {
            const nuevoDriver = req.body;
            const driverCreado = await this.driversRepo.create(nuevoDriver);
            return res.status(HTTP_RESPONSE_CODE.CREATED).json(driverCreado);
        } catch (error) {
            console.error(error);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Error al crear driver" });
        }
    };

    public update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const dataToUpdate = req.body;
            const driverActualizado = await this.driversRepo.update(
                id,
                dataToUpdate
            );
            if (!driverActualizado) {
                return res
                    .status(HTTP_RESPONSE_CODE.NOT_FOUND)
                    .json({ error: "Driver no encontrado" });
            }
            return res.json(driverActualizado);
        } catch (error) {
            console.error(error);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Error al actualizar driver" });
        }
    };

    public delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const eliminado = await this.driversRepo.delete(id);
            if (!eliminado) {
                return res
                    .status(HTTP_RESPONSE_CODE.NOT_FOUND)
                    .json({ error: "Driver no encontrado" });
            }
            return res.status(HTTP_RESPONSE_CODE.NO_CONTENT).send();
        } catch (error) {
            console.error(error);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Error al eliminar driver" });
        }
    };
}
