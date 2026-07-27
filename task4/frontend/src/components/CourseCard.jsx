import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

const CourseCard = ({ course, isEnrolled, onRefresh }) => {
  const { title, Instructor, Duration, level, price, image } = course
  const { user } = useContext(UserContext);

  const handleEnroll = async () => {
  if (!user) {
    alert("Please login to enroll.");
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:3000/api/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        courseId: course._id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Enrolled successfully!");
      if (onRefresh) onRefresh();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred during enrollment.");
  }
};
  const handleUnenroll = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:3000/api/unenroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        courseId: course._id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Unenrolled successfully!");
      if (onRefresh) onRefresh();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred during unenrollment.");
  }
};

  return (
    <article className="course-card">
      <div className="course-media">
        {image && (
          <img src={image} alt={title} className="course-image" />
        )}
      </div>

      <div className="course-body">
        <div className="course-header">
          <div className="course-heading">
            <p className="course-eyebrow">Course</p>
            <h3 className="course-title">{title}</h3>
          </div>

          <span className="course-level">{level}</span>
        </div>

        <div className="course-meta">
          <div className="course-meta-item">
            <span className="course-meta-label">Instructor</span>
            <strong>{Instructor}</strong>
          </div>
          <div className="course-meta-item">
            <span className="course-meta-label">Duration</span>
            <strong>{Duration}</strong>
          </div>
        </div>

        <div className="course-footer">
          <div className="course-price-wrap">
            <span className="course-price-label">Price</span>
            <span className="course-price">${price}</span>
          </div>

          {isEnrolled ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="enroll-btn" style={{ backgroundColor: '#28a745', cursor: 'default' }} disabled>
                Enrolled
              </button>
              <button className="enroll-btn" style={{ backgroundColor: '#dc3545' }} onClick={handleUnenroll}>
                Unenroll
              </button>
            </div>
          ) : (
            <button className="enroll-btn" onClick={handleEnroll}>
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default CourseCard
