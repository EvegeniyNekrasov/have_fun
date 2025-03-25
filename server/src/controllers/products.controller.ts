import { Request, Response } from "express";
import { ProductsRepository } from "../repositories/products_repository/products.repository";
import { HTTP_RESPONSE_CODE } from "../utils/httpCodeReponses";

export class ProductsController {
    constructor(private readonly productsRepo: ProductsRepository) {}

    public getAll = async (req: Request, res: Response) => {
        try {
            const products = await this.productsRepo.getAll();
            return res.json(products);
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
            const product = await this.productsRepo.getById(id);
            if (!product) {
                return res
                    .status(HTTP_RESPONSE_CODE.NOT_FOUND)
                    .json({ error: "Product no encontrado" });
            }

            return res.json(product);
        } catch (err) {
            console.error(err);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Some error" });
        }
    };

    public create = async (req: Request, res: Response) => {
        try {
            const nuevoProduct = req.body;
            const productCreado = await this.productsRepo.create(nuevoProduct);
            return res.status(HTTP_RESPONSE_CODE.CREATED).json(productCreado);
        } catch (error) {
            console.error(error);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Error al crear product" });
        }
    };

    public update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const dataToUpdate = req.body;
            const productActualizado = await this.productsRepo.update(
                id,
                dataToUpdate
            );
            if (!productActualizado) {
                return res
                    .status(HTTP_RESPONSE_CODE.NOT_FOUND)
                    .json({ error: "Product no encontrado" });
            }
            return res.json(productActualizado);
        } catch (error) {
            console.error(error);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Error al actualizar product" });
        }
    };

    public delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const eliminado = await this.productsRepo.delete(id);
            if (!eliminado) {
                return res
                    .status(HTTP_RESPONSE_CODE.NOT_FOUND)
                    .json({ error: "Product no encontrado" });
            }
            return res.status(HTTP_RESPONSE_CODE.NO_CONTENT).send();
        } catch (error) {
            console.error(error);
            return res
                .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
                .json({ error: "Error al eliminar product" });
        }
    };
}
