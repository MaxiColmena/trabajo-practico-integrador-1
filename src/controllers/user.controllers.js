import { User } from "../models/user.model.js";

//Esta funcionalidad trae a todos los ususarios

export const getAllUser = async(req, res) => {
    try {
        const users = await User.findAll();
        if(users.length === 0) return res.status(404).json({Message: "No existen usuarios en la base de datos"});
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Esta funcionalidad trae los usuarios por Id estrictamente

export const getUserById = async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if(user) return res.status(200).json(user);
        return res.status(404).json({Message: "El usuario no existe en la base de datos."});
    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad actualiza la información de los usuarios por Id

export const updateUser = async(req, res) =>{
    
   const {username, email, password, role} = req.body;

    try {

        const [updated] = await User.update({username, email, password, role}, {where: {id: req.params.id}});
    //si las filas afectadas son mayores a 0, el ususario se va a actualiar con éxito
    if (updated === 0) res.status(400).json({Message: "El usuario no existe o no fue encontrada"})

    return res.status(200).json({Message: "El usuario fue actualizado con éxito"});

    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad elimina a los usuarios por Id estrictamente

export const deleteUser = async(req, res) =>{
    try {
        const deleted = await User.destroy({where: {id: req.params.id}});
        //es para hacer un delete al usuario que coincida con el id que deseamos eliminar
        if(deleted === 0)
            return res.status(404).json({message: "El usuario no fue encontrado"});
        return res.status(200).json({message: "El usuario fue borrado de la base de datos"});
    } catch (error) {
    res.status(500).json({Message: error.message});  
    }
}