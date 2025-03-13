export interface Transporte {
    id: string;
    nombreConductor: string;
    avatar: string;
    vehiculo: string;
    origen: string;
    destino: string;
    distanciaKm: number;
    tiempoEstimadoHoras: number;
    fechaSalida: string;
    carga: {
        tipo: string;
        pesoKg: number;
        volumenM3: number;
    };
}
