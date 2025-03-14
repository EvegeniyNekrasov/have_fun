import { Request, Response } from "express";
import { TransporteRepository } from "../repositories/transporte.repository";
import { HTTP_RESPONSE_CODE } from "../utils/httpCodeReponses";

export class TransporteController {
    constructor(private readonly transportesRepo: TransporteRepository) {}

    public getAll = async (req: Request, res: Response) => {
        try {
            const transportes = await this.transportesRepo.getAll();
            return res.json(transportes);
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
            const transporte = await this.transportesRepo.getById(id);
            if (!transporte) {
                return res
                    .status(HTTP_RESPONSE_CODE.NOT_FOUND)
                    .json({ error: "Transporte no encontrado" });
            }

            return res.json(transporte);
        } catch (err) {
            console.error(err);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Some error" });
        }
    };

    public create = async (req: Request, res: Response) => {
        try {
            const nuevoTransporte = req.body;
            const transporteCreado = await this.transportesRepo.create(
                nuevoTransporte
            );
            return res
                .status(HTTP_RESPONSE_CODE.CREATED)
                .json(transporteCreado);
        } catch (error) {
            console.error(error);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Error al crear transporte" });
        }
    };

    public update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const dataToUpdate = req.body;
            const transporteActualizado = await this.transportesRepo.update(
                id,
                dataToUpdate
            );
            if (!transporteActualizado) {
                return res
                    .status(HTTP_RESPONSE_CODE.NOT_FOUND)
                    .json({ error: "Transporte no encontrado" });
            }
            return res.json(transporteActualizado);
        } catch (error) {
            console.error(error);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Error al actualizar transporte" });
        }
    };

    public delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const eliminado = await this.transportesRepo.delete(id);
            if (!eliminado) {
                return res
                    .status(HTTP_RESPONSE_CODE.NOT_FOUND)
                    .json({ error: "Transporte no encontrado" });
            }
            return res.status(HTTP_RESPONSE_CODE.NO_CONTENT).send();
        } catch (error) {
            console.error(error);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Error al eliminar transporte" });
        }
    };
}
