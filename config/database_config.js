import mysql from "mysql2/promise";
import dotenv from "dotenv";

if ( process.env.DB_HOST === undefined ){
    dotenv.config();
}


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
});


export default pool;