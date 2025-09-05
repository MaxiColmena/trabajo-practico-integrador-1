import { body, param } from "express-validator";
import { Tag } from "../../models/tag.model.js";
import { ArticleTag } from "../../models/articleTag.model.js";

export const createaArticleTagValidation = [
  body("article_id")
    .trim()
    .notEmpty()
    .withMessage("Todos los campos son obligatorios.")
    .isInt()
    .withMessage("Article_id debe ser un entero")
    .custom(async (article_id, { req }) => {
      const tag_id = req.body.tag_id;
      const existe = await ArticleTag.findOne({
        where: { article_id, tag_id },
      });
      if (existe) throw new Error("La relacion ya existe");
      return true;
    }),
  body("tag_id")
    .notEmpty()
    .withMessage("El tag_id es obligatorio")
    .isInt()
    .withMessage("El tag_id debe ser un número entero")
    .custom(async (tag_id) => {
      const tag = await Tag.findByPk(tag_id);
      if (!tag) throw new Error("El tag no existe");
      return true;
    }),
];

export const deleteArticleTagValidation = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const relacionExistente = await ArticleTag.findByPk(id);
        if (!relacionExistente) {
          return Promise.reject("La relación no existe");
        }
        return true;
      } catch (error) {
        console.error(
          "Ocurrio un error con la existencia de la relación",
          error
        );
        return Promise.reject(
          "Ocurrio un error con la existencia de la relación",
          error
        );
      }
    }),
];