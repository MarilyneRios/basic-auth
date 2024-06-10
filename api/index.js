import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();
connectDB();

// chemin absolu 
const __dirname = path.resolve();

const app = express();
const port = process.env.PORT

// chemin absolu 
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


// server on port process.env.PORT
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  }); 

  app.use(express.json());
  app.use(cookieParser());

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