import express from "express";
import routerTransportes from "./routes/trasnsportes.routes";

const app = express();
app.use(express.json());

app.use("/api/transportes", routerTransportes);

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
