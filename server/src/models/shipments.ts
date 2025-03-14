export interface Shipments {
    id: string;
    orderId: string;
    status: string;
    shippedAt: Date;
    estimatedArrival: Date;
    routeId: string;
}
