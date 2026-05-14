const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.lbsgxydksopwszoydggb',
 password: process.env.DB_PASSWORD,
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false
  }
})

client.connect()
.then(() => {
    console.log("Connected to PostgreSQL");
})
.catch((err) => {
    console.log("DB Connection Error", err);
});

module.exports = client;