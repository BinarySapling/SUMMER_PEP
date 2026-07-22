import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as coursesData from './data/courses.js';
import authRoutes from './routes/authRoutes.js';
import Course from './models/courseModel.js';
import User from './models/userModel.js';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/auth_db?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.2';

const courses = coursesData.default || coursesData.courses || coursesData;

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB successfully');
    try {
      const count = await Course.countDocuments();
      if (count === 0) {
        // Migration: If database has no courses, load them from the courses.js file
        await Course.insertMany(courses);
        console.log('Courses successfully migrated to MongoDB!');
      }
    } catch (err) {
      console.error('Error migrating courses:', err);
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);

app.get('/api/courses', async (req, res) => {
  try {
    const allCourses = await Course.find();
    res.json(allCourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/enroll', async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) return res.status(400).json({ message: 'Missing userId or courseId' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.courses.includes(courseId)) {
      user.courses.push(courseId);
      await user.save();
    }
    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/unenroll', async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) return res.status(400).json({ message: 'Missing userId or courseId' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.courses = user.courses.filter(id => id.toString() !== courseId.toString());
    await user.save();
    res.json({ message: 'Unenrolled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/mycourses/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('courses');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});













