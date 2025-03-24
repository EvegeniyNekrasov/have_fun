import { Drivers } from "../../models/drivers";

export interface DriversRepository {
    getAll(): Promise<Drivers[]>;
    getById(id: string): Promise<Drivers | null>;
    create(driver: Drivers): Promise<Drivers>;
    update(id: string, data: Partial<Drivers>): Promise<Drivers | null>;
    delete(id: string): Promise<boolean>;
}
