import { Products } from "../../models/products";

export interface ProductsRepository {
    getAll(): Promise<Products[]>;
    getById(id: string): Promise<Products | null>;
    create(product: Products): Promise<Products>;
    update(id: string, data: Partial<Products>): Promise<Products | null>;
    delete(id: string): Promise<boolean>;
}
