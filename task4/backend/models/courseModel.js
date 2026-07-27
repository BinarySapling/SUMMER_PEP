import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: String,
    Instructor: String,
    price: Number,
    Duration: String,
    level: String,
    image: String,
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
