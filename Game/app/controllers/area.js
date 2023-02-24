import { Area } from "../models/index";

const index = async (req, res) => {
    const resp = await Area.findAll();
    const areas = resp.map((el) => el.toJSON());
    res.render("area/index", { 
        areas: areas
        
    });
}

export default { index }