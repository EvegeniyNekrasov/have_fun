import express from "express";

import routerTransportes from "./routes/trasnsportes.routes";
import routerVehicle from "./routes/vehicle.routes";
import routerDrivers from "./routes/drivers.routes";
import routerProducts from "./routes/product.routes";

const app = express();

app.use(express.json());

app.use("/api/transportes", routerTransportes);
app.use("/api/vehicles", routerVehicle);
app.use("/api/drivers", routerDrivers);
app.use("/api/products", routerProducts);

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
