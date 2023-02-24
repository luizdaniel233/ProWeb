import session from 'express-session';

const models = require('../models/index');
const Usuario = models.Usuario;
const Partida = models.Partida;

const index = (req, res) => {
    res.render("main/game", {
        usuarioId: req.session.uid,
        csrf: req.csrfToken()
    })
}

async function ranking (req, res) {
    try {
        const partidas = await Partida.findAll({
            include: [{
                model: Usuario,
                required: true
               }],
            order: [
                ['pontuacao', 'DESC']
            ]
        });
        console.log(partidas.map(partida => partida.toJSON()));
        res.render("jogo/ranking", {
            partidas: partidas.map(partida => partida.toJSON())
        });
    } catch (error) {
        console.log(error);
    }
    

};
async function save (req,res) {
    try {
        await Partida.create({
            usuarioId: req.session.uid,
            pontuacao: req.params.score
        });
       res.redirect("/jogo/ranking");
    } catch(errors) {
        console.log(errors);
    }
};

export default {index, ranking, save}