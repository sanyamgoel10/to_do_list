const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

// Open database connection
const connectDB = async () => {
    return open({
        filename: "./database.db",
        driver: sqlite3.Database,
    });
};

// Creating the table structure
const initializeDB = async () => {
    const db = await connectDB();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS notes_list (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Title TEXT UNIQUE NOT NULL,
            Description TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

const getRowDbData = async (query, params) => {
    const db = await connectDB();
    return await db.get(query, params);
}

const getDbData = async (query, params) => {
    const db = await connectDB();
    return await db.all(query, params);
}

const setDbData = async (query, params) => {
    const db = await connectDB();
    const result = await db.run(query, params);
    return result.lastID;
}

module.exports = { getRowDbData, getDbData, setDbData };
