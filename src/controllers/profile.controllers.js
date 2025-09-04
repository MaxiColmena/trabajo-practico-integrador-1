import { User } from "../models/profile.model.js";
import { Op } from "sequelize";

//Esta funcionalidad crea los usuarios en nuestra base de datos
export const createProfile = async(req, res) => {
    
    const {name, email, password } = req.body;

    try {
        const user = await User.create({name, email, password});
        res.status(201).json({Message: "El usuario ha sido creado con éxito: ", user});
    } catch (error) {
        console.log("Error en la creación del usuario: ", error)
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad trae a todos los ususarios

export const getAllProfile = async(req, res) => {
    try {
        const users = await User.findAll();
        if(users.length === 0) return res.status(404).json({Message: "No existen usuarios en la base de datos"});
        res.json(users)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Esta funcionalidad trae los usuarios por Id estrictamente

export const getProfileById = async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if(user) return res.status(200).json(user);
        return res.status(404).json({Message: "El usuario no existe en la base de datos."});
    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad actualiza la información de los usuarios por Id

export const updateProfile = async(req, res) =>{
    
   const {name, email, password } = req.body;

    try {

        const [updated] = await User.update({name, email, password}, {where: {id: req.params.id}});
    //si las filas afectadas son mayores a 0, el ususario se va a actualiar con éxito
    if (updated === 0) res.status(400).json({Message: "El usuario no existe o no fue encontrada"})

    return res.status(200).json({Message: "El usuario fue actualizado con éxito"});

    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad elimina a los usuarios por Id estrictamente

export const deleteProfile = async(req, res) =>{
    try {
        const deleted = await User.destroy({where: {id: req.params.id}});
        //es para hacer un delete al usuario que coincida con el id que deseamos eliminar
    if(deleted) return res.json({message: "El usuario fue borrado de la base de datos"});
    return res.status(404).json({message: "El usuario no fue encontrado"});
    } catch (error) {
    res.status(500).json({Message: error.message});  
    }
}