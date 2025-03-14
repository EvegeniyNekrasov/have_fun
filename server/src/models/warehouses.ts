export interface Warehouses {
    id: string;
    location: string;
    capacity: number;
    inventory: Inventory[];
}

type Inventory = {
    productId: string;
    quality: number;
};
