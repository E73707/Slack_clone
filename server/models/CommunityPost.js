import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class CommunityPost extends Model {}

CommunityPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      references: {
        model: "users",
        key: "uid",
      },
      onDelete: "CASCADE",
    },
    communityId: {
      type: DataTypes.INTEGER,
      references: {
        model: "communities",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    channelId: {
      type: DataTypes.INTEGER,
      references: {
        model: "community_channels",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "community_post",
    tableName: "community_posts",
  }
);

export default CommunityPost;
