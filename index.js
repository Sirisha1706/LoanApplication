import express from 'express';
import dotenv from 'dotenv';
import loanRoutes from './src/loanRoutes.js';
import connectDB from './src/db.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000'}));


// API Routes
app.use("/api/loan", loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
