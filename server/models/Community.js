import { Model, DataTypes } from "sequelize";

import sequelize from "../config/connection.js";

class Community extends Model {}

Community.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    community_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    community_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    community_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "community",
  }
);

export default Community;
