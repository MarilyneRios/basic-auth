import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.NODE_ENV

// server on port process.env.NODE_ENV
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  }); 

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world');
  });