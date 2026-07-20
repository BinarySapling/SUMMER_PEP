import React from 'react'

const CourseCard = ({ course }) => {
  const { title, Instructor, Duration, level, price, image } = course

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
          <button className="enroll-btn">Enroll Now</button>
        </div>
      </div>
    </article>
  )
}

export default CourseCard
