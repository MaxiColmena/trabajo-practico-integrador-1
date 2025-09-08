import { ArticleTag } from "../models/articleTag.model.js";

//Esta funcionalidad crea las relaciones en nuestra base de datos
export const createArticleTag = async(req, res) => {
    
    const {article_id, tag_id } = req.body;

    try {
        const articleTag = await ArticleTag.create({article_id, tag_id});
        res.status(201).json({Message: "La relación ha sido creado con éxito: ", articleTag});
    } catch (error) {
        console.log("Error en la creación de la relación: ", error)
        res.status(500).json({Message: error.message});
    }
};

//Esta funcionalidad elimina a las relaciones por Id estrictamente

export const deleteArticleTag = async(req, res) =>{
    try {
        const articleTagdeleted = await ArticleTag.destroy({where: {id: req.params.id}});
        //es para hacer un delete a la relación que coincida con el id que deseamos eliminar
    if(articleTagdeleted) return res.json({message: "La relación fue borrada de la base de datos"});
    return res.status(404).json({message: "La relación no fue encontrada"});
    } catch (error) {
    res.status(500).json({Message: error.message});  
    }
};