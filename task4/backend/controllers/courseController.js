import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

export const createCourse = async (req, res) => {
    try {

        const {
            title,
            price,
            Duration,
            level,
            image,
        } = req.body;

        const instructor = await User.findById(req.user.id);

        if (!instructor) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found",
            });
        }

        if (instructor.role !== "instructor") {
            return res.status(403).json({
                success: false,
                message: "Only instructors can create courses.",
            });
        }

        const course = await Course.create({
            title,
            Instructor: `${instructor.fname} ${instructor.lname}`,
            instructorId: instructor._id,
            price,
            Duration,
            level,
            image,
        });

        instructor.coursesAdded.push(course._id);
        await instructor.save();

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            course,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};