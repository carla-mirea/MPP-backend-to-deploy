import sqlite3 from "sqlite3";
import { Database } from "sqlite3";
import path from 'path'

// Define the path to your SQLite database file
const dbPath = path.join(__dirname, "database.sqlite");

// Create a new SQLite database instance
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// Define the SQL query to create the 'monitors' table if it doesn't exist
const createTableSQL = `
    CREATE TABLE IF NOT EXISTS monitors (
        id INTEGER PRIMARY KEY,
        brand TEXT,
        refreshRate TEXT,
        pictureUrl TEXT
    )
`;

// Define the SQL query to create the 'reviews' table if it doesn't exist
const createReviewsTableSQL = `
    CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY,
        monitorId INTEGER,
        rating INTEGER,
        comment TEXT,
        FOREIGN KEY(monitorId) REFERENCES monitors(id)
    )
`;

// Define the SQL query to create the 'registration' table for user registration
const createRegistrationTableSQL = `
    CREATE TABLE IF NOT EXISTS registration (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        password TEXT
    )
`;

// Execute the SQL query to create the 'monitors' table
db.run(createTableSQL, (err) => {
    if (err) {
        console.error("Error creating 'monitors' table:", err.message);
    } else {
        console.log("Successfully created 'monitors' table.");
    }
});

// Execute the SQL query to create the 'reviews' table
db.run(createReviewsTableSQL, (err) => {
    if (err) {
        console.error("Error creating 'reviews' table:", err.message);
    } else {
        console.log("Successfully created 'reviews' table.");
    }
});

// Execute the SQL query to create the 'registration' table
db.run(createRegistrationTableSQL, (err) => {
    if (err) {
        console.error("Error creating 'registration' table:", err.message);
    } else {
        console.log("Successfully created 'registration' table.");
    }
});

export default db as Database;

