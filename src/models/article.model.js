import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from "../models/user.model.js"

export const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT(),
    allowNull: false
  },
  excerpt: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('published', 'archived'),
    allowNull: false,
    defaultValue: 'published'
  }
}, {
  timestamps: true, 
});

//Relación uno a muchos
Article.belongsTo(User, { 
  foreignKey: "user_id", 
  as: "author" 
});

User.hasMany(Article, { 
  foreignKey: "user_id", 
  as: "articles" 
});