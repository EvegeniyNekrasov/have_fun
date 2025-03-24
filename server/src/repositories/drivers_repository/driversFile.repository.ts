import path from "path";
import { v4 as uuid } from "uuid";

import { Drivers } from "../../models/drivers";
import { DriversRepository } from "./drivers.repository";
import { readJsonFile, writeJsonFile } from "../../utils/file-utils";

const dataFilePath = path.join(
    import.meta.dirname,
    "../../../data/drivers.json"
);

export class DriversFileRepository implements DriversRepository {
    public async getAll(): Promise<Drivers[]> {
        return await readJsonFile<Drivers>(dataFilePath);
    }

    public async getById(id: string): Promise<Drivers | null> {
        const drivers = await readJsonFile<Drivers>(dataFilePath);
        const driver = drivers.find((t) => t.id === id);
        return driver || null;
    }

    public async create(driver: Drivers): Promise<Drivers> {
        const drivers = await readJsonFile<Drivers>(dataFilePath);
        if (!driver.id) {
            driver.id = uuid();
        }

        drivers.push(driver);
        await writeJsonFile(dataFilePath, drivers);
        return driver;
    }

    public async update(
        id: string,
        data: Partial<Drivers>
    ): Promise<Drivers | null> {
        const drivers = await readJsonFile<Drivers>(dataFilePath);
        const index = drivers.findIndex((t) => t.id === id);
        if (index === -1) return null;

        const updated = { ...drivers[index], ...data, id };
        drivers[index] = updated;
        await writeJsonFile(dataFilePath, drivers);
        return updated;
    }

    public async delete(id: string): Promise<boolean> {
        let drivers = await readJsonFile<Drivers>(dataFilePath);
        const exist = drivers.some((t) => t.id === id);
        if (!exist) return false;

        drivers = drivers.filter((t) => t.id !== id);
        await writeJsonFile(dataFilePath, drivers);
        return true;
    }
}
