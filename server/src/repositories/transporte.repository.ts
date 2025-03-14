import { Transporte } from "../models/transporte";

export interface TransporteRepository {
    getAll(): Promise<Transporte[]>;
    getById(id: string): Promise<Transporte | null>;
    create(transporte: Transporte): Promise<Transporte>;
    update(id: string, data: Partial<Transporte>): Promise<Transporte | null>;
    delete(id: string): Promise<boolean>;
}
