import { body, param } from "express-validator";
import { Tag } from "../../models/tag.model.js";

export const createTagValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("No puede estar vacío el nombre de la etiqueta")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener al menos 2 caracteres y maximo 30.")
    .custom(async (value) => {
      try {
        const tagUnica = await Tag.findOne({ where: { name: value } });
        if (tagUnica) {
          return Promise.reject("Nombre ya existente");
        }
      } catch (error) {
        console.log("error ");
      }
    }),
];

export const updateTagValidation = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const EtiquetaExistente = await Tag.findByPk(id);
        if (!EtiquetaExistente) {
          return Promise.reject("La etiqueta no existe");
        }
        return true;
      } catch (error) {
        console.error(
          "Ocurrio un error con la existencia de la etiqueta",
          error
        );
        return Promise.reject(
          "Ocurrio un error con la existencia de la etiqueta",
          error
        );
      }
    }),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("No puede estar vacío el nombre de la etiqueta")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener al menos 2 caracteres y maximo 30.")
    .custom(async (value) => {
      try {
        const tagUnica = await Tag.findOne({ where: { name: value } });
        if (tagUnica) {
          return Promise.reject("Nombre ya existente");
        }
      } catch (error) {
        console.log("error ");
      }
    }),
];

export const getIdTagValidation = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const EtiquetaExistente = await Tag.findByPk(id);
        if (!EtiquetaExistente) {
          return Promise.reject("La etiqueta no existe");
        }
        return true;
      } catch (error) {
        console.error(
          "Ocurrio un error con la existencia de la etiqueta",
          error
        );
        return Promise.reject(
          "Ocurrio un error con la existencia de la etiqueta",
          error
        );
      }
    }),
];

export const deleteTagValidation = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const EtiquetaExistente = await Tag.findByPk(id);
        if (!EtiquetaExistente) {
          return Promise.reject("La etiqueta no existe");
        }
        return true;
      } catch (error) {
        console.error(
          "Ocurrio un error con la existencia de la etiqueta",
          error
        );
        return Promise.reject(
          "Ocurrio un error con la existencia de la etiqueta",
          error
        );
      }
    }),
];
