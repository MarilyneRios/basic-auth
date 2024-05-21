import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js'

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT

// server on port process.env.PORT
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  }); 

  app.use('/api/user', userRoutes);