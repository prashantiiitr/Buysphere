import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoute.js';
import connectToDb from './config/db.js';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js';
dotenv.config();

const app = express();

connectToDb();

app.use(express.json()); // Middleware to parse JSON
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/auth', categoryRoutes);

app.get('/', (req, res) => {
    res.send("Hello world");
});

export default app;
