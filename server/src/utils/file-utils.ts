import fs from "fs/promises";
import path from "path";

export async function readJsonFile<T>(filePath: string): Promise<T[]> {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data) as T[];
    } catch (err) {
        console.error("Error leyendo el archivo: ", err);
        return [];
    }
}

export async function writeJsonFile<T>(
    filePath: string,
    data: T[]
): Promise<void> {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
        console.error("Error escribiendo archivo:", err);
    }
}
