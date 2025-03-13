const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({ error: "Ocurrió un error en el servidor" });
});

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = app;
