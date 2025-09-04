import {rtrim} from "express-validator";
import { Article, User } from "../models/article.model.js";



//Esta funcionalidad crea los usuarios en nuestra base de datos
export const createArticle = async(req, res) => {
   
    const { title, content, excerpt, status, user_id } = req.body;
  try {
    const article = await Article.create({ title, content, excerpt, status, user_id,});
    res.status(201).json({ Message: "El artículo fue creado con exito" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

//Esta funcionalidad trae a todos los ususarios

export const getAllArticle = async(req, res) => {
  try {
    const articles = await Article.findAll();

    if (articles.length === 0) {
      return res.status(404).json({ Message: "No hay ningun artículo" });
    }
    return res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

//Esta funcionalidad trae los usuarios por Id estrictamente

export const getArticleById = async(req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      attributes: {
        exclude: ["user_id"],
      },
    });
    if (article) {
      return res.status(200).json(article);
    }
    return res.status(404).json({ Message: "El articulo no fue encontrado" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};


//Esta funcionalidad actualiza la información de los usuarios por Id

export const updateArticle = async(req, res) =>{
  
    const { title, content, excerpt, status, user_id } = req.body;

  try {
    const [updated] = await Article.update(
      { title, content, excerpt, status, user_id },
      { where: { id: req.params.id } }
    );
    if (updated === 0) {
      return res.status(404).json({ Message: "El articulo no existe" });
    }
    res.status(200).json({ Message: "Se actualizo un articulo" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

//Esta funcionalidad elimina a los usuarios por Id estrictamente

export const deleteArticle = async(req, res) =>{
    try {
        const deleted = await User.destroy({where: {id: req.params.id}});
        //es para hacer un delete al usuario que coincida con el id que deseamos eliminar
    if(deleted) return res.json({message: "El usuario fue borrado de la base de datos"});
    return res.status(404).json({message: "El usuario no fue encontrado"});
    } catch (error) {
    res.status(500).json({Message: error.message});  
    }
}