import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let connection;  
export async function initdb(){
    if(connection){
        return connection;
    }
    try {
        connection= await mysql.createConnection({
            host:process.env.HOST,
            database:process.env.DATABASE,
            password:process.env.PASSWORD,
            user:process.env.USER,
            port:process.env.DB_PORT
        })
        console.log("the connection is succesfull")
        return connection;
    } catch (error) {
        console.log(error);
        throw error;
    }
}