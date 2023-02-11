const express = require("express");
const port = 3001;
const app = express();
const logger = require("morgan");
const { router } = require("./routes");

app.use(logger("short"));

app.use(router);

app.listen(port, () => {
  console.log(`${port} available!`);
});
