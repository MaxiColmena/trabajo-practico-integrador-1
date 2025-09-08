import { Article } from "../models/article.model.js";
import { Tag } from "../models/tag.model.js";

export const createTag = async (req, res) => {
  const { name } = req.body;
  try {
    const tag = await Tag.create({
      name,
    });
    res.status(201).json({ Message: "La etiqueta fue creada con exito", tag });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

export const updateTag = async (req, res) => {
  const { name } = req.body;
  try {
    const [updated] = await Tag.update(
      { name },
      { where: { id: req.params.id } }
    );
    if (updated === 0) {
      return res.status(404).json({ Message: "La etiqueta no existe" });
    }
    res.status(200).json({ Message: "Se actualizo una etiqueta con éxito" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const getAllTag = async (req, res) => {
  try {
    const etiquetas = await Tag.findAll();
    if (etiquetas.length === 0) {
      return res
        .status(404)
        .json({ Message: "No hay ninguna etiqueta en la base de datos" });
    }
    return res.status(200).json(etiquetas);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const getTagById = async (req, res) => {
  try {
    const etiqueta = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Article,
          attributes: { exclude: ["user_id"] },
          as: "articles",
          through: { attributes: [] },
        },
      ],
    });
    if (etiqueta) {
      return res.status(200).json(etiqueta);
    }
    return res.status(404).json({ Message: "La etiqueta no fue encontrada" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const deleted = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (deleted === 0)
      return res.status(404).json({ Message: "La etiqueta no fue encontrada" });
    res.status(200).json({ Message: "Etiqueta eliminada." });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};
