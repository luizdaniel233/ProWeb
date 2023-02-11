const express = require("express");
const router = express.Router();
const operation = require("../controllers/operation");

router.get("/operation/:operation/:num_1/:num_2", operation.operation);

router.use((req, res) => {
  res.status(404).send("Rota não encontrada!");
});

module.exports = { router };
