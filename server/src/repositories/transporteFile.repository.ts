import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

import { Transporte } from "../models/transporte";
import { TransporteRepository } from "./transporte.repository";

const dataFilePath = path.join(import.meta.dirname, "../../data/transportes.json");

export class TransporteFileRepository implements TransporteRepository {
    private async readData(): Promise<Transporte[]> {
        try {
            const data = await fs.readFile(dataFilePath, "utf-8");
            return JSON.parse(data) as Transporte[];
        } catch (err) {
            console.error("Error: ", err);
            return [];
        }
    }

    private async writeData(transporte: Transporte[]): Promise<void> {
        try {
            await fs.writeFile(
                dataFilePath,
                JSON.stringify(transporte, null, 2),
                "utf-8"
            );
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    public async getAll(): Promise<Transporte[]> {
        return await this.readData();
    }

    public async getById(id: string): Promise<Transporte | null> {
        const transportes = await this.readData();
        const transporte = transportes.find((t) => t.id === id);
        return transporte || null;
    }

    public async create(transporte: Transporte): Promise<Transporte> {
        const transportes = await this.readData();
        if (!transporte.id) {
            transporte.id = uuid();
        }

        transportes.push(transporte);
        await this.writeData(transportes);
        return transporte;
    }
    public async update(
        id: string,
        data: Partial<Transporte>
    ): Promise<Transporte | null> {
        const transportes = await this.readData();
        const index = transportes.findIndex((t) => t.id === id);
        if (index === -1) return null;

        const updated = { ...transportes[index], ...data, id };
        transportes[index] = updated;
        await this.writeData(transportes);
        return updated;
    }

    public async delete(id: string): Promise<boolean> {
        let transportes = await this.readData();
        const exist = transportes.some((t) => t.id === id);
        if (!exist) return false;

        transportes = transportes.filter((t) => t.id !== id);
        await this.writeData(transportes);
        return true;
    }
}
