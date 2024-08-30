import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class CommunityMember extends Model {}

CommunityMember.init(
  {
    communityId: {
      type: DataTypes.INTEGER,
      references: {
        model: "communities",
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
  },
  {
    sequelize,
    modelName: "community_member",
  }
);

export default CommunityMember;
