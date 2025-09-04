import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";

export const Profile = sequelize.define("profile",{
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    }, 
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    biography: {
        type: DataTypes.TEXT(),
        allowNull: true
    },
    avatar_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    birth_date: {
        type: DataTypes.DATE(),
        allowNull: true
    }
},{
        timestamps: true
    });

    //Relación de uno a uno

    Profile.belongsTo(User, {
        foreignKey: "user_id",
        as: "user"
    });

    User.hasOne(Profile, {
        foreignKey: "user_id",
        as: "profile"
    });
