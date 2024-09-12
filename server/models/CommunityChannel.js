import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class CommunityChannel extends Model {}

CommunityChannel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    channel_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    communityId: {
      type: DataTypes.INTEGER,
      references: {
        model: "communities",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "community_channel",
    tableName: "community_channels",
  }
);

export default CommunityChannel;
