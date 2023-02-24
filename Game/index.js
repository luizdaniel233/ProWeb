import express from "express";
import router from "./app/router/router";
import { engine } from "express-handlebars";
import path from 'path';
import cookieParser from "cookie-parser";
import csurf from "csurf";
import { v4 as uuidv4 } from "uuid";
import session from "express-session";

const morgan = require("morgan");
const sass = require("node-sass-middleware");
const __dirname = path.resolve();
const PORT = 3000;
const app = express();

app.engine('handlebars', engine({
    helpers: require(`${__dirname}/app/views/helpers/index`),
    layoutsDir: `${__dirname}/app/views/layouts`,
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views',`${__dirname}/app/views/`);
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(csurf ({ cookie: { key: "__session", httpOnly: true } }));


app.get("/uuid", (req,res) => {
    res.send(uuidv4());
});
app.use(session({
    genid: (req) => {
        return uuidv4()
    },
    secret: 'Hi9Cf#mK98',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    app.locals.isLogged = 'uid' in req.session;
    next();
})


app.use(router);
app.use(morgan("combined"));
app.use(sass({
    src: `${__dirname}/public/scss`,
    dest: `${__dirname}/public/css`,
    outputStyle: "compressed",
    prefix: "/css"
}));

app.use("/img", [
    express.static(`${__dirname}/public/img`)
]);
app.use("/css", [
    express.static(`${__dirname}/public/css`)
]);
app.use("/webfonts", [
    express.static(`${__dirname}/node_modules/@fortawesome/fontawesome-free/webfonts`)
]);
app.use("/js", [
    express.static(`${__dirname}/public/js`),
    express.static(`${__dirname}/node_modules/bootstrap/dist/js`),
    express.static(`${__dirname}/node_modules/@popperjs/core/dist/umd/`)
]);

app.use(function(req, res, next) {
    console.log("Requisição " + req.method + " " + req.url);
    next();
 });

app.listen(PORT, function() {
    console.log(`Listenning at: ${PORT}`);
});