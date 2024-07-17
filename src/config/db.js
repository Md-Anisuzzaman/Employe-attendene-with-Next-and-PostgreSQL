import postgres from 'postgres';
import 'dotenv/config';

const mydb = postgres(process.env.DATABASE_URL, {
    ssl: { rejectUnauthorized: false }, // Ensure SSL is used and configured
    max: 10, // Maximum number of clients in the pool
    idle_timeout: 30, // Idle timeout in seconds
    connect_timeout: 10, // Connection timeout in seconds
});
// General function to create a table if it doesn't exist
export const createTableIfNotExists = async (createTableQuery) => {
    try {
        await mydb.unsafe(createTableQuery);
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
};

// Specific table creation SQL
const createEmployeeTableSQL = `
    CREATE TABLE IF NOT EXISTS Employee (
        employeeID SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        address TEXT NOT NULL,
        password VARCHAR(100) NOT NULL UNIQUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;
const createUsersTableSQL = `
    CREATE TABLE IF NOT EXISTS Users (
        usersID SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        address TEXT NOT NULL,
        password VARCHAR(100) NOT NULL UNIQUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

export const initDatabase = async () => {
    try {
        await createTableIfNotExists(createEmployeeTableSQL);
        await createTableIfNotExists(createUsersTableSQL);
    } catch (error) {
        console.error('Error initializing the database:', error.message);
        throw error;
    }
};

export default mydb;
