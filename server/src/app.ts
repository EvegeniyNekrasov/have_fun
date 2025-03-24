import express from "express";

import routerTransportes from "./routes/trasnsportes.routes";
import routerVehicle from "./routes/vehicle.routes";
import routerDrivers from "./routes/drivers.routes";

const app = express();

app.use(express.json());

app.use("/api/transportes", routerTransportes);
app.use("/api/vehicles", routerVehicle);
app.use("/api/drivers", routerDrivers);

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
