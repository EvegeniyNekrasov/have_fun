import { Transporte } from "@/types/transporte";
import { get } from "@/utils/dataFetch";

export class TrasporteRepository {
    public static async getTransportes(): Promise<Transporte[]> {
        const transportes = await get<Transporte[]>("api/transportes");
        return transportes;
    }
}
