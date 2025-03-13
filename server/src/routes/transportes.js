const express = require("express");
const { getTransportes } = require("../controllers/transportesController");
const router = express.Router();

router.get("/", getTransportes);

module.exports = router;
