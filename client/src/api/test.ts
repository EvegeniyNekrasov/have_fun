import { Transporte } from "../types/transporte";

export async function getTransportes(): Promise<Transporte[]> {
    try {
        const req = await fetch("/api/transportes");
        if (!req.ok) throw new Error("AHHHHHH");
        const data = (await req.json()) as Transporte[];
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
}
