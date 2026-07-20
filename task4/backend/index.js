import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as coursesData from './data/courses.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/auth_db?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.2';

const courses = coursesData.default || coursesData.courses || coursesData;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);

app.get('/api/courses', (req, res) => {
	res.json(courses);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});













