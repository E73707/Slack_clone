// import { DataTypes } from "sequelize";
// import sequelize from "../config/connection.js"; // Adjust the path as necessary

// export const User = sequelize.define("User", {
//   // Define your model's attributes here
//   uid: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     primaryKey: true,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   displayName: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
// });
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js"; // Adjust the path as necessary

class User extends Model {}

// Initialize the User model
User.init(
  {
    // Define your model's attributes here
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize, // Pass the connection instance
    modelName: "User", // Choose the name of the model
  }
);

export default User;
