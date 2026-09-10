import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', (req, res) => res.json({ message: 'Auth routes' }));
app.use('/api/admin', (req, res) => res.json({ message: 'Admin routes' }));
app.use('/api/students', (req, res) => res.json({ message: 'Student routes' }));
app.use('/api/subjects', (req, res) => res.json({ message: 'Subject routes' }));
app.use('/api/ai', (req, res) => res.json({ message: 'AI routes' }));

app.get('/health', (req, res) => res.json({ status: 'OK' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
