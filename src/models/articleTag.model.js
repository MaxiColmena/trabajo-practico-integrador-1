import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Tag } from "../models/tag.model.js"
import { Article } from './article.model.js';

export const ArticleTag = sequelize.define('ArticleTag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
}, {
  timestamps: true,
});

//Relación muchos a muchos

Article.belongsToMany(Tag, {
  through: ArticleTag,
  foreignKey: "tag_id",
  as: "tags",
  onDelete: "CASCADE"
});

Tag.belongsToMany(Article, {
  through: ArticleTag,
  foreignKey: "article_id",
  as: "articles",
  onDelete: "CASCADE  ",
});

ArticleTag.belongsTo(Tag, {
  foreignKey: "tag_id",
  as: "tags",
  onDelete: "CASCADE",
});

ArticleTag.belongsTo(Article, {
  foreignKey: "article_id",
  as: "articles",
  onDelete: "CASCADE"
});