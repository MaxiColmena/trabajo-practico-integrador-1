import { Article } from "../models/article.model.js";
import { User } from "../models/user.model.js";

//Esta funcionalidad crea los articulos en nuestra base de datos
export const createArticle = async(req, res) => {
   
    const { title, content, excerpt, status, user_id } = req.body;
  try {
    const article = await Article.create({ title, content, excerpt, status, user_id,});
    res.status(201).json({ Message: "El artículo fue creado con exito" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

//Esta funcionalidad trae a todos los articulos

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

//Esta funcionalidad trae los articulos por Id estrictamente

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


//Esta funcionalidad actualiza la información de los articulos por Id

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

//Esta funcionalidad elimina a los articulos por Id estrictamente

export const deleteArticle = async(req, res) =>{
    try {
        const deleted = await Article.destroy({where: {id: req.params.id}});
        //es para hacer un delete al articulo que coincida con el id que deseamos eliminar
    if(deleted === 0) return res.status(404).json({message: "El articulo no fue encontrado"});
        return res.json({message: "El articulo fue borrado de la base de datos"});
    } catch (error) {
    res.status(500).json({Message: error.message});  
    }
};


export const articlesGetUser = async (req, res) => {
  try {
    const articleUserLogin = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: {
        model: Article,
        as: "articles",
      },
    });

    return res.status(200).json(articleUserLogin);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const articleGetIdUser = async (req, res) => {
  try {
    const articleOne = await Article.findOne({
      where: {
        id: id,
        user_id: req.user.id,
      },
    });

    if (!articleOne) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
