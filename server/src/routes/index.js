const express = require("express");
const router = express.Router();

const transportesRoutes = require("./transportes");

router.use("/transportes", transportesRoutes);

module.exports = router;
