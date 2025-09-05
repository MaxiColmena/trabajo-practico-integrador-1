import { body, param } from "express-validator";
import { User } from "../../models/user.model.js";

export const updateUserValidation = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
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
  body("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo de username no puede estar vacío")
    .isLength({ min: 3, max: 20 })
    .custom(async (value) => {
      const usernameUnico = await User.findOne({
        username: value,
        id: { [Op.ne]: req.params.id },
      });
      if (usernameUnico) {
        throw new Error("El username ya existe");
      }
    }),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .notEmpty()
    .withMessage("El campo de email no debe estar vacío")
    .isLength({ max: 100 })
    .withMessage("El email es demasiado largo")
    .custom(async (value) => {
      const emailUnico = await User.findOne({
        email: value,
        id: { [Op.ne]: req.params.id },
      });
      if (emailUnico) {
        throw new Error("El email ya existe");
      }
    }),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo de password no puede estar vacío")
    .isLength({ min: 8, max: 255 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe tener al menos una letra mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe tener al menos una letra minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe tener al menos un número"),
  body("role")
    .optional()
    .trim()
    .isIn(["user", "admin"])
    .withMessage("El role debe ser 'user' o 'admin'"),
];

export const getIdUserValidation = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
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

export const deleteUserValidation = [
  param("id")
    .isInt()
    .withMessage("El id del parametro debe ser un entero")
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