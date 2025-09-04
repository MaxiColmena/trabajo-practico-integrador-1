import { ArticleTag } from "../models/articleTag.model.js";

//Esta funcionalidad crea los usuarios en nuestra base de datos
export const createArticleTag = async(req, res) => {
    
    const {article_id, tag_id } = req.body;

    try {
        const user = await User.create({article_id, tag_id});
        res.status(201).json({Message: "El usuario ha sido creado con éxito: ", user});
    } catch (error) {
        console.log("Error en la creación del usuario: ", error)
        res.status(500).json({Message: error.message});
    }
};

//Esta funcionalidad elimina a los usuarios por Id estrictamente

export const deleteArticleTag = async(req, res) =>{
    try {
        const deleted = await User.destroy({where: {id: req.params.id}});
        //es para hacer un delete al usuario que coincida con el id que deseamos eliminar
    if(deleted) return res.json({message: "El usuario fue borrado de la base de datos"});
    return res.status(404).json({message: "El usuario no fue encontrado"});
    } catch (error) {
    res.status(500).json({Message: error.message});  
    }
};