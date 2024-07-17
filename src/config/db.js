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



export const initDatabase = async () => {
    try {
        await createTableIfNotExists(createEmployeeTableSQL);
    } catch (error) {
        console.error('Error initializing the database:', error.message);
        throw error;
    }
};

export default mydb;
