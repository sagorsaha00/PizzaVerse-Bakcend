import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

export const url = process.env.MONGODB_CONNECTION_STRING;


if (!url) {
    throw new Error("CRITICAL: MONGODB_CONNECTION_STRING is missing in your .env file!");
}

const options = {
    maxPoolSize: 10,
    minPoolSize: 1,
    maxIdleTimeMS: 30000,
    connectTimeoutMS: 10000,
};


const client = new MongoClient(url, options);

export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.error("Database connection failed:", err);
        throw err;
    }
}

export default client;