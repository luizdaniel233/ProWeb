import { Curso, Usuario } from "../models/index";
import bcrypt from "bcryptjs";

const index = (req, res) => {
    const conteudo = 'Página principal da aplicação';
    res.render('main/index', {
        conteudo: conteudo,
    });
};
const about = (req, res) => {
    const conteudo = 'Página sobre a aplicação';
    res.render('main/about', {
        conteudo: conteudo,
    });
};

const ui = (req, res) => {
    res.render('main/ui', {
    });
}

const signup = async (req,res) => {
    const cursos = await Curso.findAll();

    if (req.route.methods.get) {
        res.render("main/signup", {
            cursos: cursos.map( c => c.toJSON()),
            csrf: req.csrfToken()
        });
    } else {
        const usuario = req.body;
        try {
            bcrypt.genSalt(10, (errorSalt, salt) => {
                bcrypt.hash(usuario.senha, salt, async (error, hash) => {
                    await Usuario.create({
                        nome: usuario.nome,
                        email: usuario.email,
                        senha: hash,
                        cursoId: usuario.cursoId
                    });
                })
            })
            
            res.redirect("/");
        } catch(error) {
            console.log(error);
        }
    }
    
}

const login = async (req,res) => {
    if (req.route.methods.get) {
        res.render("main/login", {
            csrf: req.csrfToken()
        })
    } else {
        const credentials = req.body;
        const user = await Usuario.findOne({where:{ email: credentials.email }});
        if (user) {
            bcrypt.compare(credentials.senha, user.senha, (error, sucesso) => {
                if (error) console.log(error);
                else if (sucesso) {
                    req.session.uid = user.id;
                    res.redirect("/");
                } else {
                    res.render("main/login", {
                        csrf: req.csrfToken()
                    });
                }
            });
        } else {
            res.render("main/login", {
                csrf: req.csrfToken()
            });
        }
    }
    
}
const logout = (req,res) => {
    console.log(req.session);
    req.session.destroy((error) => {
        if (error) console.log(error);
        else res.redirect("/");
    })
}

export default { index, about, ui, signup, login, logout }