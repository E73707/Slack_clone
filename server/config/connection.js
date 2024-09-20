import Sequelize from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file in development
dotenv.config();

let sequelize;

// Check if running in production with CLEARDB_DATABASE_URL (on Heroku)
if (process.env.CLEARDB_DATABASE_URL) {
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
    dialect: "mysql",
  });
} else {
  // Fallback for local development environment
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

export default sequelize;
