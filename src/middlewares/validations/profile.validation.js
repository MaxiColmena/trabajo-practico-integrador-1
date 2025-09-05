import { body, param } from "express-validator";
import { Profile } from "../../models/profile.model.js";
import { Op } from "sequelize";
import { User } from "../../models/user.model.js";

export const createProfileValidation = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("El campo de first_name no puede estar vacío")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "El campo first_name no puede tener menos de 2 caracteres ni más de 50"
    )
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("En el campo de first_name solo pueden ir letras"), //Función buscada en documentación, fijarse por las dudas la especificación de idioma.

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("El campo de last_name no puede estar vacío")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "El campo last_name no puede tener menos de 2 caracteres ni más de 50"
    )
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("En el campo de last_name solo pueden ir letras"),

  body("biography")
    .trim()
    .notEmpty()
    .withMessage("El campo de biography no puede estar vacío")
    .isLength({ max: 500 })
    .withMessage("La biography no puede superar los 500 caracteres."),

  body("avatar_url")
    .optional()
    .isURL()
    .withMessage("El avatar debe ser un URL valido"),

  body("birth_date")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo de cumpleaños debe estar completo")
    .isISO8601()
    // .isDate()
    .withMessage("El cumpleaños debe estar en formato fecha"),

  body("user_id")
    .optional()
    .trim()
    .isInt()
    .withMessage("El id de user debe ser un entero")
    .custom(async (value) => {
      try {
        const perfilUnico = await Profile.findOne({
          where: { user_id: value },
        });
        if (perfilUnico) {
          return Promise.reject("Ya existe un perfil asociado al usuario");
        }
      } catch (error) {
        console.error("Error con el perfil.", error);
        return Promise.reject("Error al encontrar al perfil", error);
      }
    })
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

export const updateProfileValidation = [
  body("first_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo de first_name no puede estar vacío")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "El campo first_name no puede tener menos de 2 caracteres ni más de 50"
    )
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("En el campo de first_name solo pueden ir letras"), //Función buscada en documentación, fijarse por las dudas la especificación de idioma.

  body("last_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo de last_name no puede estar vacío")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "El campo last_name no puede tener menos de 2 caracteres ni más de 50"
    )
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("En el campo de last_name solo pueden ir letras"),

  body("biography")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo de biography no puede estar vacío")
    .isLength({ max: 500 })
    .withMessage("La biography no puede superar los 500 caracteres."),

  body("avatar_url")
    .optional()
    .optional()
    .isURL()
    .withMessage("El avatar debe ser un URL valido"),

  body("birth_date")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo de cumpleaños debe estar completo")
    .isDate()
    .withMessage("El cumpleaños debe estar en formato fecha"),

  body("user_id")
    .optional()
    .trim()
    .isInt()
    .withMessage("El id de user debe ser un entero")
    .custom(async (value) => {
      try {
        const perfilUnico = await Profile.findOne({
          where: { user_id: value },
          id: { [Op.ne]: req.params.id },
        });
        if (perfilUnico) {
          return Promise.reject("Ya existe un perfil asociado al usuario");
        }
      } catch (error) {
        console.error("Error con el perfil.", error);
        return Promise.reject("Error al encontrar al perfil", error);
      }
    })
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

export const getIdProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const PerfilExistente = await Profile.findByPk(id);
        if (!PerfilExistente) {
          return Promise.reject("El perfil no existe");
        }
        return true;
      } catch (error) {
        console.error("Ocurrio un error con la existencia del perfil", error);
        return Promise.reject(
          "Ocurrio un error con la existencia del perfil",
          error
        );
      }
    }),
];

export const deleteProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
    .custom(async (id) => {
      try {
        const PerfilExistente = await Profile.findByPk(id);
        if (!PerfilExistente) {
          return Promise.reject("El perfil no existe");
        }
        return true;
      } catch (error) {
        console.error("Ocurrio un error con la existencia del perfil", error);
        return Promise.reject(
          "Ocurrio un error con la existencia del perfil",
          error
        );
      }
    }),
];