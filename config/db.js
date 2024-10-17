import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// HARDCORE THE CREDENTIALS HERE IF RUNNING LOCALALLY
const mySqlPool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

export default mySqlPool;
