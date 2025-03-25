import path from "path";
import { v4 as uuid } from "uuid";

import { Products } from "../../models/products";
import { ProductsRepository } from "./products.repository";
import { readJsonFile, writeJsonFile } from "../../utils/file-utils";

const dataFilePath = path.join(
    import.meta.dirname,
    "../../../data/products.json"
);

export class ProductsFileRepository implements ProductsRepository {
    public async getAll(): Promise<Products[]> {
        return await readJsonFile<Products>(dataFilePath);
    }

    public async getById(id: string): Promise<Products | null> {
        const products = await readJsonFile<Products>(dataFilePath);
        const product = products.find((t) => t.id === id);
        return product || null;
    }

    public async create(product: Products): Promise<Products> {
        const products = await readJsonFile<Products>(dataFilePath);
        if (!product.id) {
            product.id = uuid();
        }

        products.push(product);
        await writeJsonFile(dataFilePath, products);
        return product;
    }

    public async update(
        id: string,
        data: Partial<Products>
    ): Promise<Products | null> {
        const products = await readJsonFile<Products>(dataFilePath);
        const index = products.findIndex((t) => t.id === id);
        if (index === -1) return null;

        const updated = { ...products[index], ...data, id };
        products[index] = updated;
        await writeJsonFile(dataFilePath, products);
        return updated;
    }

    public async delete(id: string): Promise<boolean> {
        let products = await readJsonFile<Products>(dataFilePath);
        const exist = products.some((t) => t.id === id);
        if (!exist) return false;

        products = products.filter((t) => t.id !== id);
        await writeJsonFile(dataFilePath, products);
        return true;
    }
}
