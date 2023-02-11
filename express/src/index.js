const express = require("express");
const logger = require("morgan");
const handlebars = require("express-handlebars");
const routes = require("./routes");
const sass = require("node-sass-middleware");
const port = 3001;
const app = express();

app.use(
  sass({
    src: `${__dirname.replace("/src", "/public/scss")}`,
    dest: `${__dirname.replace("/src", "/public/css")}`,
    outputStyle: "compressed",
    prefix: "/css",
  })
);

app.use(logger("short"));

app.use("/public", express.static(__dirname.replace("/src", "/public")));

app.use(routes);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.listen(port, () => {
  console.log(`Port ${port} available!`);
});
