const { generateTransportes } = require("../data/fakeData");

module.exports.getTransportes = (req, res) => {
    const count = parseInt(req.query.count) || 10;
    const transportes = generateTransportes(count);

    const { origen, destino } = req.query;
    let filtered = transportes;
    if (origen) {
        filtered = filtered.filter((t) =>
            t.origen.toLocaleLowerCase().includes(origen.toLocaleLowerCase())
        );
    }

    if (destino) {
        filtered = filtered.filter((t) =>
            t.destino.toLowerCase().includes(destino.toLowerCase())
        );
    }

    return res.json(filtered);
};
