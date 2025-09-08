import { body, param } from "express-validator";
import { User } from "../../models/user.model.js";
import { Article } from "../../models/article.model.js";

export const createaArticleValidation = [
  body("article_id")
    .trim()
    .notEmpty()
    .withMessage("Todos los campos son obligatorios.")
    .isInt()
    .withMessage("Article_id debe ser un entero")
    .custom(async (article_id, { req }) => {
      const tag_id = req.body.tag_id;
      const existe = await Article.findOne({
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

export const deleteArticleValidation = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const relacionExistente = await Article.findByPk(id);
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

export const updateArticleValidation = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const articleExistente = await Article.findByPk(id);
        if (!articleExistente) {
          return Promise.reject("El articulo no existe");
        }
        return true;
      } catch (error) {
        console.error("Ocurrio un error con la existencia del articulo", error);
        return Promise.reject(
          "Ocurrio un error con la existencia del articulo",
          error
        );
      }
    }),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo title es obligatorio")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title no debe ser menor a 3 ni mayor a 200 caracteres."),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo de content debe ser completado")
    .isLength({ min: 50 })
    .withMessage("Content debe tener al menos 50 caracteres"),
  body("excerpt")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Excerpt supera los 500 caracteres"),
  body("status")
    .optional()
    .trim()
    .isIn(["published", "archived"])
    .withMessage("Status debe ser 'published' o 'archived'"),
  body("user_id")
    .optional()
    .trim()
    .custom(async (id) => {
      try {
        const usuarioExistente = await User.findByPk(id);
        if (!usuarioExistente) {
          return Promise.reject("El usuario no existe");
        }
        return true;
      } catch (error) {
        console.error("Ocurrio un error con la existencia del Usuario", error);
        return Promise.reject(
          "Ocurrio un error con la existencia del usuario",
          error
        );
      }
    }),
];

export const getIdArticleValidation = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const articleExistente = await Article.findByPk(id);
        if (!articleExistente) {
          return Promise.reject("El articulo no existe");
        }
        return true;
      } catch (error) {
        console.error("Ocurrio un error con la existencia del articulo", error);
        return Promise.reject(
          "Ocurrio un error con la existencia del articulo",
          error
        );
      }
    }),
];