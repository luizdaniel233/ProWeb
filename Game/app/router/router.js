import express from "express";
import mainController from "../controllers/main";
import areaController from "../controllers/area";
import cursoController from "../controllers/curso";
import jogoController from "../controllers/jogo";
import authCheck from "../utils/authCheck";

const router = express.Router();

router.get('/', mainController.index);
router.get('/about', mainController.about);
router.get('/ui', mainController.ui);
router.get("/signup", mainController.signup);
router.post("/signup", mainController.signup);
router.get("/login", mainController.login);
router.post("/login", mainController.login);
router.get("/logout", mainController.logout);


//Area Controller
router.get("/area", areaController.index);

//Curso Controller
router.get('/curso' , authCheck, cursoController.index);
router.get('/curso/create' , authCheck, cursoController.create);
router.post('/curso/create' , authCheck, cursoController.create);
router.get('/curso/update/:id' , authCheck, cursoController.update);
router.post('/curso/update/:id' , authCheck, cursoController.update);
router.delete('/curso/remove/:id' , authCheck, cursoController.remove);
router.get('/curso/:id' , authCheck, cursoController.read); 

//Jogo Controller
router.get('/jogo/index', authCheck, jogoController.index);
router.get('/jogo/ranking', authCheck, jogoController.ranking);
router.get('/jogo/save/:score', authCheck, jogoController.save);

export default router;