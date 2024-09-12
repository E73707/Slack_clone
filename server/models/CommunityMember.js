import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class CommunityMember extends Model {}

CommunityMember.init(
  {
    communityId: {
      type: DataTypes.INTEGER,
      references: {
        model: "community",
        key: "id",
      },
      onDelete: "CASCADE", // If a community is deleted, its members are also removed
    },
    userId: {
      type: DataTypes.STRING,
      references: {
        model: "users",
        key: "uid",
      },
      onDelete: "CASCADE", // If a user is deleted, their membership in communities is also removed
    },
    role: {
      type: DataTypes.ENUM("member", "admin"),
      defaultValue: "member",
    },
  },

  {
    sequelize,
    modelName: "community_member",
    tableName: "community_members",
  }
);

export default CommunityMember;
