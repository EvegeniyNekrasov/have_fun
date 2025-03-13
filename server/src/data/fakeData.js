const { faker } = require("@faker-js/faker");

function generateTransportes(count = 10) {
    return Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        nombreConductor: faker.person.fullName(),
        avatar: `https://avatar.iran.liara.run/public`,
        vehiculo: faker.vehicle.vehicle(),
        origen: faker.location.city(),
        destino: faker.location.city(),
        distanciaKm: faker.number.int({ min: 50, max: 2000 }),
        tiempoEstimadoHoras: faker.number.int({ min: 1, max: 48 }),
        fechaSalida: faker.date.soon({ days: 7 }).toISOString().split("T")[0],
        carga: {
            tipo: faker.commerce.productName(),
            pesoKg: faker.number.int({ min: 100, max: 25000 }),
            volumenM3: faker.number.float({
                min: 1,
                max: 100,
                precision: 0.01,
            }),
        },
    }));
}

module.exports = {
    generateTransportes,
};
