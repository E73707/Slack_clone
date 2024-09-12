import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class ChannelMember extends Model {}

ChannelMember.init(
  {
    channelId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ensure this field is not null
      references: {
        model: "community_channels",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure this field is not null
      references: {
        model: "users",
        key: "uid",
      },
      onDelete: "CASCADE",
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    communityChannelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "community_channels",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "channel_member",
    tableName: "channel_members",
  }
);

export default ChannelMember;
