import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";

export const updateProfile = async (req, res) => {
  const { first_name, last_name, biography, avatar_url, birth_date } = req.body;
  try {
    const [updated] = await Profile.update(
      { first_name, last_name, biography, avatar_url, birth_date },
      { where: { id: req.params.id } }
    );
    if (updated === 0) {
      return res.status(404).json({ Message: "El perfil no existe" });
    }
    res.status(200).json({ Message: "Se actualizo un perfil" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};
export const getProfileById = async (req, res) => {
  try {
    const perfil = await Profile.findByPk(req.user.id, {
      attributes: { exclude: ["user_id"] },
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
          as: "user",
        },
      ],
    });
    if (perfil) {
      return res.status(200).json(perfil);
    }
    return res.status(404).json({ Message: "El perfil no fue encontrado" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};
export const getAllProfile = async (req, res) => {
  try {
    const perfiles = await Profile.findAll({
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
          as: "user",
        },
      ],
    });
    if (perfiles.length === 0) {
      return res
        .status(404)
        .json({ Message: "No hay ningun perfil en la base de datos" });
    }
    return res.status(200).json(perfiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteProfile = async (req, res) => {
  try {
    const deleted = await Profile.destroy({
      where: { id: req.params.id },
    });
    if (deleted === 0)
      return res.status(404).json({ Message: "El perfil no fue encontrado" });
    res.status(200).json({ Message: "perfil eliminado." });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};
