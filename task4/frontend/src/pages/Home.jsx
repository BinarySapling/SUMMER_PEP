import { useContext, useEffect, useState } from 'react';
import CourseCard from './../components/CourseCard';
import { UserContext } from '../context/UserContext';

const Home = () => {
	const [courses, setCourses] = useState([]);
	const [myCourses, setMyCourses] = useState([]);
	const { user } = useContext(UserContext);

	const fetchCourses = () => {
		fetch('http://localhost:3000/api/courses')
			.then((response) => response.json())
			.then((data) => setCourses(data))
			.catch(() => setCourses([]));

		if (user) {
			fetch(`http://localhost:3000/api/mycourses/${user.id}`)
				.then((response) => response.json())
				.then((data) => setMyCourses(data))
				.catch(() => setMyCourses([]));
		}
	};

	useEffect(() => {
		fetchCourses();
	}, [user]);

	const myCourseIds = Array.isArray(myCourses) ? myCourses.map(c => c._id) : [];
	const courseCount = Array.isArray(courses) ? courses.length : 0;

	return (
		<section className="page-section home-page">
			<div className="hero-card landing-hero">
				<p className="eyebrow">CourseHub Learning</p>
				<h1>Build real web skills with practical courses</h1>
				<p className="section-lead">
					Simple lessons, clear topics, and projects that help you learn faster.
				</p>
				<div className="hero-actions">
					<a className="hero-link" href="#courses">Browse Courses</a>
					<span className="hero-note">{courseCount} courses available</span>
				</div>
				<div className="hero-stats">
					<div>
						<strong>Beginner friendly</strong>
						<span>Start with the basics</span>
					</div>
					<div>
						<strong>Hands on</strong>
						<span>Learn by building</span>
					</div>
					<div>
						<strong>Structured paths</strong>
						<span>Move step by step</span>
					</div>
				</div>
			</div>

			<div className="course-grid" id="courses">
				{Array.isArray(courses) && courses.map((course) => (
					<CourseCard 
						key={course._id || course.id} 
						course={course} 
						isEnrolled={myCourseIds.includes(course._id)}
						onRefresh={fetchCourses}
					/>
				))}
			</div>
		</section>
	);
};

export default Home;