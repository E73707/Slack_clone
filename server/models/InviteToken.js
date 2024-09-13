import { Model, DataTypes } from "sequelize";

import sequelize from "../config/connection.js";

class InviteToken extends Model {}

InviteToken.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    communityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "communities",
        key: "id",
      },
      onDelete: "cascade",
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "InviteToken",
    tableName: "invite_tokens",
  }
);

export default InviteToken;
