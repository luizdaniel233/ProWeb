const models = require('../models/index');
const Curso = models.Curso;
const Area = models.Area;

async function index(req, res) { 
    const cursos = await Curso.findAll();
    res.render("curso/index", {
        cursos: cursos.map(curso => curso.toJSON())
    });
};
async function read(req, res) {
    const { id } = req.params;
    try {
        const curso = await Curso.findByPk(id, { include: Area });
        res.render("curso/read", {curso: curso.toJSON()})
    } catch (error) {
        console.log(error);
    }
};

async function create(req, res) {
    if (req.route.methods.get) {
        res.render('curso/create', {
            csrf: req.csrfToken()
        });
    } else {
        try {
            await Curso.create({
                sigla: req.body.sigla,
                nome: req.body.nome,
                descricao: req.body.descricao,
                areaId: req.body.area
            });
            res.redirect("/curso");
        } catch(errors) {
            res.render('curso/create', {
                errors: errors
            });
        }
           
        
    }
};
async function update(req, res) { 
    const curso =  await Curso.findOne({where: { id: req.params.id }})
    if (req.route.methods.get){
        res.render("curso/update", {
            curso: curso.toJSON(),
            csrf: req.csrfToken()
        })
    } else {
        try {
            await Curso.update({
                sigla: req.body.sigla,
                nome: req.body.nome,
                descricao: req.body.descricao,
                areaId: req.body.area
            }, { where: { id: req.params.id }});
            res.redirect("/curso/" + req.params.id)
        } catch(errors) {
            res.render("curso/update", {
                curso: curso.toJSON(),
                errors: errors
            })
        }
        
    }
    
};
async function remove(req, res) { 
    await Curso.destroy({ where: {id:req.params.id}});
    res.redirect("/curso");
};

module.exports = { index, read, create, update, remove }