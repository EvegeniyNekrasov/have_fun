export interface Vehicles {
    id: string;
    licensePlate: string;
    capacity: {
        maxWeight: number;
        maxVolume: number;
    };
    status: string;
}
