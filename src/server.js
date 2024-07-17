import { initDatabase } from './config/db';

export const connect = async () => {
    try {
        await initDatabase(); // Ensure the Users table exists
    } catch (error) {
        console.error('Error initializing the database:', error.message);
        process.exit(1); // Exit if table creation fails
    }
};



