import { Vehicles } from "../../models/vehicles";

export interface VehicleRepository {
    getAll(): Promise<Vehicles[]>;
    getById(id: string): Promise<Vehicles | null>;
    create(vehicle: Vehicles): Promise<Vehicles>;
    update(id: string, data: Partial<Vehicles>): Promise<Vehicles | null>;
    delete(id: string): Promise<boolean>;
}
