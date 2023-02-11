const express = require("express");
const controllers_main = require("./controllers/main");
const router = express.Router();

router.get("/home", (req, res) => {
  res.status(200).send("Hello world!");
});

router.get("/express", (req, res) => {
  res.status(200).redirect("https://expressjs.com/pt-br/");
});

router.get("/about", (req, res) => {
  // exec_1
  res.render("exec_1", { layout: false });
});

router.get("/", controllers_main.index);
router.get("/about_example", controllers_main.sobre);

router.use((req, res) => {
  res.status(404).send("404!");
});

module.exports = router;
