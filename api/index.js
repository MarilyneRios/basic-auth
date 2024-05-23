import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT

// server on port process.env.PORT
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  }); 

  app.use(express.json());

  app.use('/api/user', userRoutes);
  app.use('/api/auth', authRoutes);

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });