import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import * as coursesData from './data/courses.js';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middleware/authenticate.js';
import Course from './models/courseModel.js';
import User from './models/userModel.js';

const app = express();
const PORT = process.env.PORT || 3000;

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/auth_db?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.2';

const courses = coursesData.default || coursesData.courses || coursesData;

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB successfully');

    try {
      const count = await Course.countDocuments();

      if (count === 0) {
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

// Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
app.use(express.json());

// Auth Routes (Public)
app.use('/api/auth', authRoutes);

// ================= PUBLIC ROUTES =================

// Get all courses
app.get('/api/courses', async (req, res) => {
  try {
    const allCourses = await Course.find();
    res.json(allCourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= PROTECTED ROUTES =================

// Add a new course (instructor only)
app.post('/api/courses', authMiddleware, async (req, res) => {
  try {
    // Only instructors can add courses
    if (req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Only instructors can add courses' });
    }

    const { title, price, Duration, level, image } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Course title is required' });
    }

    const course = await Course.create({
      title,
      Instructor: req.user.fname || 'Instructor',
      price: price || 0,
      Duration: Duration || 'N/A',
      level: level || 'Beginner',
      image: image || '',
      instructorId: req.user.id,
    });

    res.status(201).json({ success: true, course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enroll in a course
app.post('/api/enroll', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        message: 'Course ID is required',
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (!user.courses.includes(courseId)) {
      user.courses.push(courseId);
      await user.save();
    }

    res.json({
      success: true,
      message: 'Enrolled successfully',
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Unenroll from a course
app.post('/api/unenroll', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        message: 'Course ID is required',
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    user.courses = user.courses.filter(
      (id) => id.toString() !== courseId
    );

    await user.save();

    res.json({
      success: true,
      message: 'Unenrolled successfully',
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Get logged-in user's courses
app.get('/api/mycourses', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('courses');

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.json(user.courses);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});



app.get("/api/instructor/mycourses", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({
        message: "Only instructors can access this route",
      });
    }

    const courses = await Course.find({
      instructorId: req.user.id,
    });

    res.json(courses);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});