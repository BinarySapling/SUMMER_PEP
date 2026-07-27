import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/api/instructor/mycourses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setCourses(data);
    };

    fetchCourses();
  }, []);

  return (
    <section className="page-section home-page">
      <div className="hero-card landing-hero">
        <p className="eyebrow">Instructor Dashboard</p>
        <h1>My Courses</h1>
      </div>

      <div className="course-grid">
        {courses.length ? (
          courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              isEnrolled={false}
            />
          ))
        ) : (
          <p>You haven't created any courses yet.</p>
        )}
      </div>
    </section>
  );
};

export default InstructorCourses;