export default interface Orders {
    id: string;
    clientId: string;
    createdAt: string;
    estimateDelivery: string;
    status: string;
    items: Items[];
}

type Items = {
    productId: string;
    quality: number;
    price: number;
};
