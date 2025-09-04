import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";


//Esta funcionalidad crea los perfiles en nuestra base de datos
export const createProfile = async(req, res) => {
    
    const { first_name, last_name, biography, avatar_url, birth_date } = req.body;

    try {
        const profile = await Profile.create({ first_name, last_name, biography, avatar_url, birth_date });
        res.status(201).json({Message: "El perfil ha sido creado con éxito: ", profile});
    } catch (error) {
        res.status(500).json({Message: error.message});
    }
};

//Esta funcionalidad trae a todos los perfiles

export const getAllProfile = async(req, res) => {
    try {
        const profile = await Profile.findAll();
        if(profile.length === 0) return res.status(404).json({Message: "No existen perfiles en la base de datos"});
        return res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//Esta funcionalidad trae los perfiles por Id estrictamente

export const getProfileById = async(req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id);
        if(profile) {
            return res.status(200).json(profile);
        }
        return res.status(404).json({Message: "El perfil no existe en la base de datos."});
    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad actualiza la información de los perfil por Id

export const updateProfile = async(req, res) =>{
    
   const { first_name, last_name, biography, avatar_url, birth_date } = req.body;

    try {
        const [updated] = await Profile.update({ first_name, last_name, biography, avatar_url, birth_date }, {where: {id: req.params.id}});
    //si las filas afectadas son mayores a 0, el perfil se va a actualiar con éxito
    if (updated === 0) {
        res.status(400).json({Message: "El perfil no existe o no fue encontrada"})
}
    return res.status(200).json({Message: "El perfil fue actualizado con éxito"});
    } catch (error) {
        res.status(500).json({Message: error.message});
    }
};

//Esta funcionalidad elimina a los perfil por Id estrictamente

export const deleteProfile = async(req, res) =>{
    try {
        const deleted = await Profile.destroy({where: {id: req.params.id}});
        //es para hacer un delete al perfil que coincida con el id que deseamos eliminar
    if(deleted === 0) return res.status(404).json({message: "El perfil no fue encontrado"});
    return res.status(200).json({Message: "El perfil fue eliminado"});
    } catch (error) {
    res.status(500).json({Message: error.message});  
    }
}