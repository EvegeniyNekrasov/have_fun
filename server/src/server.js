const app = require("./app");

const PORT = process.env.PORT || 6969;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
