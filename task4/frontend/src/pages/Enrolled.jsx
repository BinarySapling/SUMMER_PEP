import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import CourseCard from '../components/CourseCard';

const Enrolled = () => {
    const { user } = useContext(UserContext);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const fetchEnrolled = async () => {
    if (!user) return;

    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:3000/api/mycourses",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        console.log(response.status);
        console.log(data);

        setEnrolledCourses(data);
    } catch (err) {
        console.error(err);
    }
};

    useEffect(() => {
        fetchEnrolled();
    }, [user]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <section className="page-section home-page">
            <div className="hero-card landing-hero">
                <p className="eyebrow">My Learning</p>
                <h1>Enrolled Courses</h1>
                <p className="section-lead">
                    Here are all the courses you have enrolled in. Keep learning!
                </p>
            </div>

            <div className="course-grid" id="courses">
                {Array.isArray(enrolledCourses) && enrolledCourses.length > 0 ? (
                    enrolledCourses.map((course) => (
                        <CourseCard
                            key={course._id || course.id}
                            course={course}
                            isEnrolled={true}
                            onRefresh={fetchEnrolled}
                        />
                    ))
                ) : (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                        You haven't enrolled in any courses yet.
                    </p>
                )}
            </div>
        </section>
    );
};

export default Enrolled;
