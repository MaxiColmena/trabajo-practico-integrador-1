import { User } from "../models/user.models.js";
import { Op } from "sequelize";


//Esta funcionalidad crea los usuarios en nuestra base de datos
export const createUser = async(req, res) => {

    //Esta funcionalidad elimina los espacios al principio y al final de las cadenas de texto(string)
    if(req.body){
        for (let value in req.body){
            if (typeof req.body[value] === "string"){
                req.body[value] = req.body[value].trim();
            }
        }
    }

    const {name, email, password } = req.body;

    try {
        //Validacion para que los datos no se reciban vacios.
        if(name === undefined || name === "") return res.status(400).json({errorMessage: "Debe completar el campo 'name', no puede estar vacio."})
        if(email === undefined || email === "") return res.status(400).json({errorMessage: "Debe completar el campo 'email', no puede estar vacio."})
        if(password === undefined || password === "") return res.status(400).json({errorMessage: "Debe completar el campo 'password', no puede estar vacio."})

        const user = await User.create({name, email, password});
        res.status(201).json({Message: "El usuario ha sido creado con éxito: ", user});
    } catch (error) {
        console.log("Error en la creación del usuario: ", error)
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad trae a todos los ususarios

export const getAllUser = async(req, res) => {
    try {
        const users = await User.findAll();
        if(users.length === 0) return res.status(404).json({Message: "No existen usuarios en la base de datos"});
        res.json(users)
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
    
   const {name, email, password } = req.body;
    
    //quita los espacios al principio y al final
    if(req.body){
        for (let value in req.body){
            if (typeof req.body[value] === "string"){
                req.body[value] = req.body[value].trim();
            }
        }
    }
    
    try {
        //validación para que el nombre sea unico
        if (name){
        const nameUnique = await User.findOne({ where: { name, id: { [Op.ne]: req.params.id } } });
        if(nameUnique) return res.status(400).json({errorMessage: "El nombre debe ser único por usuario."});
        }

        const [updated] = await User.update({name, email, password}, {where: {id: req.params.id}});
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
    if(deleted) return res.json({message: "El usuario fue borrado de la base de datos"});
    return res.status(404).json({message: "El usuario no fue encontrado"});
    } catch (error) {
    res.status(500).json({Message: error.message});  
    }
}