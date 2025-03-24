import path from "path";
import { v4 as uuid } from "uuid";

import { Vehicles } from "../../models/vehicles";
import { VehicleRepository } from "./vehicle.repository";
import { readJsonFile, writeJsonFile } from "../../utils/file-utils";

const dataFilePath = path.join(
    import.meta.dirname,
    "../../../data/vehicles.json"
);

export class VehicleFileRepository implements VehicleRepository {
    public async getAll(): Promise<Vehicles[]> {
        return await readJsonFile<Vehicles>(dataFilePath);
    }

    public async getById(id: string): Promise<Vehicles | null> {
        const vehicles = await readJsonFile<Vehicles>(dataFilePath);
        const vehicle = vehicles.find((t) => t.id === id);
        return vehicle || null;
    }

    public async create(vehicle: Vehicles): Promise<Vehicles> {
        const vehicles = await readJsonFile<Vehicles>(dataFilePath);
        if (!vehicle.id) {
            vehicle.id = uuid();
        }

        vehicles.push(vehicle);
        await writeJsonFile(dataFilePath, vehicles);
        return vehicle;
    }

    public async update(
        id: string,
        data: Partial<Vehicles>
    ): Promise<Vehicles | null> {
        const vehicles = await readJsonFile<Vehicles>(dataFilePath);
        const index = vehicles.findIndex((t) => t.id === id);
        if (index === -1) return null;

        const updated = { ...vehicles[index], ...data, id };
        vehicles[index] = updated;
        await writeJsonFile(dataFilePath, vehicles);
        return updated;
    }

    public async delete(id: string): Promise<boolean> {
        let vehicles = await readJsonFile<Vehicles>(dataFilePath);
        const exist = vehicles.some((t) => t.id === id);
        if (!exist) return false;

        vehicles = vehicles.filter((t) => t.id !== id);
        await writeJsonFile(dataFilePath, vehicles);
        return true;
    }
}
