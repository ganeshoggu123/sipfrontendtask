import sqlite3 from "sqlite3";



const db = new sqlite3.Database(
    "C://sqlite-tools-win-x64-3530100//sipbackend.db",

    (error: Error | null) => {

        if (error) {

            console.log("Error Occurred");

        } else {

            console.log("Connected to DB");

        }

    }
);



export default db;