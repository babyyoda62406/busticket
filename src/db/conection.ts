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
      // Crear la base de datos 'busticket'
      await db.createCollection('dummy'); // Crear una colección temporal para forzar la creación de la base de datos
      console.log('Base de datos "busticket" creada');
      await db.dropCollection('dummy'); // Eliminar la colección temporal
    } else {
      console.log('La base de datos "busticket" ya existe');
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Salir del proceso en caso de error
  }
};

export default connectDB;
