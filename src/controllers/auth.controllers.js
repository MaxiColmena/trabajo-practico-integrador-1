import jwt from "jsonwebtoken";
import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";

export const registerCreate = async (req, res) => {
  const { username, email, password, role, first_name, last_name, biography, avatar_url, birth_date } = req.body;
  try {
    const user = await User.create({
      username: username,
      email: email,
      password: password,
      role: role,
    });

    await Profile.create({
        first_name: first_name,
        last_name: last_name,
        biography: biography,
        avatar_url: avatar_url,
        birth_date: birth_date,
        user_id: user.id
    });

    // const hashedPassword = await hashPassword(password);

    // await UserModel.create({
    //   username: username,
    //   email: email,
    //   password: hashedPassword,
    //   person_id: person.id,
    // });

    res.status(201).json({
      msg: "usuario creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// export const login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({
//       where: {
//         username: username,
//         // password: askdjakshd123123,
//       },
//       include: {
//         model: PersonModel,
//         as: "person",
//       },
//     });

//     if (!user) {
//       return res.status(404).json({
//         msg: "El usuario o la contraseña no coincide",
//       });
//     }

//     const isMatch = await comparePassword(password, user.password);

//     if (!isMatch) {
//       return res.status(404).json({
//         msg: "El usuario o la contraseña no coincide",
//       });
//     }

//     if (!user) {
//       return res.status(404).json({
//         msg: "Credenciales Incorrectas",
//       });
//     }

//     // generar un token forma 1 con helpers (RECOMENDADA)
//     // const token = generateToken(user);

//     // generar un token forma 2
//     const token = jwt.sign(
//       {
//         id: user.id,
//         name: user.person.name,
//         lastname: user.person.lastname,
//       },
//       "s3cr3t",
//       {
//         expiresIn: "1h",
//       }
//     );

//     // Enviar token como cookie
//     res.cookie("token", token, {
//       httpOnly: true, // No accesible desde JavaScript
//       maxAge: 1000 * 60 * 60, // 1 hora
//     });

//     return res.status(200).json({
//       msg: "Logueado correctamente",
//     });
//   } catch (error) {
//     res.status(500).json({
//       msg: "Error interno del servidor",
//     });
//   }
// };

// export const logout = async (req, res) => {
//   res.clearCookie("token"); // Eliminar cookie del navegador
//   return res.json({ message: "Logout exitoso" });
// };

// export const profile = async (req, res) => {
//   const user = req.userLogged;

//   try {
//     res.status(200).json({
//       name: user.name,
//       lastname: user.lastname,
//     });
//   } catch (error) {}
// };