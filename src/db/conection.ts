import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.DB_URL || "";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {});
    console.log('Conected to MongoDB');

    const db = mongoose.connection.db;
    if(db === undefined) return  ;; 
    const databasesList = await db.admin().listDatabases();

    const dbExists = databasesList.databases.some(database => database.name === 'busticket');

    if (!dbExists) {
      await db.createCollection('dummy'); 
      console.log('Database "busticket" created');
      await db.dropCollection('dummy'); 
    } else {
      console.log('Database "busticket" already exists');
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

export default connectDB;
