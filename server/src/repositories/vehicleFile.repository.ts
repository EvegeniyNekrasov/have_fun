import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

import { Vehicles } from "../models/vehicles";
import { VehicleRepository } from "./vehicle.repository";

const dataFilePath = path.join(import.meta.dirname, "../../data/vehicles.json");

export class VehicleFileRepository implements VehicleRepository {
    private async readData(): Promise<Vehicles[]> {
        try {
            const data = await fs.readFile(dataFilePath, "utf-8");
            return JSON.parse(data) as Vehicles[];
        } catch (err) {
            console.error("Error: ", err);
            return [];
        }
    }

    private async writeData(vehicle: Vehicles[]): Promise<void> {
        try {
            await fs.writeFile(
                dataFilePath,
                JSON.stringify(vehicle, null, 2),
                "utf-8"
            );
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    public async getAll(): Promise<Vehicles[]> {
        return await this.readData();
    }

    public async getById(id: string): Promise<Vehicles | null> {
        const vehicles = await this.readData();
        const vehicle = vehicles.find((t) => t.id === id);
        return vehicle || null;
    }

    public async create(vehicle: Vehicles): Promise<Vehicles> {
        const vehicles = await this.readData();
        if (!vehicle.id) {
            vehicle.id = uuid();
        }

        vehicles.push(vehicle);
        await this.writeData(vehicles);
        return vehicle;
    }

    public async update(
        id: string,
        data: Partial<Vehicles>
    ): Promise<Vehicles | null> {
        const vehicles = await this.readData();
        const index = vehicles.findIndex((t) => t.id === id);
        if (index === -1) return null;

        const updated = { ...vehicles[index], ...data, id };
        vehicles[index] = updated;
        await this.writeData(vehicles);
        return updated;
    }

    public async delete(id: string): Promise<boolean> {
        let vehicles = await this.readData();
        const exist = vehicles.some((t) => t.id === id);
        if (!exist) return false;

        vehicles = vehicles.filter((t) => t.id !== id);
        await this.writeData(vehicles);
        return true;
    }
}
