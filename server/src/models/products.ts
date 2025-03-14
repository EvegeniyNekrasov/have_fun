export interface Products {
    id: string;
    name: string;
    description: string;
    dimentions: {
        weight: number;
        volume: number;
    };
    price: number;
    stock: number;
}
