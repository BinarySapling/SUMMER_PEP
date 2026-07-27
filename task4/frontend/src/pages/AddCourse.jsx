import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AddCourse = () => {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		title: '',
		price: '',
		Duration: '',
		level: 'Beginner',
		image: ''
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		if (error) setError('');
		if (success) setSuccess('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.title) {
			setError('Course title is required');
			return;
		}

		try {
			setError('');
			setSuccess('');
			setLoading(true);

			const token = localStorage.getItem("token");

			const response = await fetch("http://localhost:3000/api/courses", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title: formData.title,
					price: Number(formData.price) || 0,
					Duration: formData.Duration,
					level: formData.level,
					image: formData.image,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Failed to add course');
			}

			setSuccess('Course added successfully!');
			setFormData({ title: '', price: '', Duration: '', level: 'Beginner', image: '' });
		} catch (err) {
			setError(err.message || 'Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="page-card card-panel auth-page" id="add-course">
			<div className="auth-card">
				<p className="eyebrow">Instructor</p>
				<h2>Add a New Course</h2>

				{error && (
					<div style={{
						color: '#e74c3c',
						backgroundColor: 'rgba(231, 76, 60, 0.1)',
						padding: '12px',
						borderRadius: '6px',
						border: '1px solid rgba(231, 76, 60, 0.2)',
						marginBottom: '16px',
						fontSize: '0.95rem'
					}}>
						{error}
					</div>
				)}

				{success && (
					<div style={{
						color: '#2ecc71',
						backgroundColor: 'rgba(46, 204, 113, 0.1)',
						padding: '12px',
						borderRadius: '6px',
						border: '1px solid rgba(46, 204, 113, 0.2)',
						marginBottom: '16px',
						fontSize: '0.95rem'
					}}>
						{success}
					</div>
				)}

				<form className="auth-form" onSubmit={handleSubmit}>
					<div className="auth-field">
						<label htmlFor="course-title">Course Title *</label>
						<input
							id="course-title"
							name="title"
							type="text"
							value={formData.title}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="auth-field auth-field-row">
						<div>
							<label htmlFor="course-price">Price</label>
							<input
								id="course-price"
								name="price"
								type="number"
								value={formData.price}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor="course-duration">Duration</label>
							<input
								id="course-duration"
								name="Duration"
								type="text"
								placeholder="e.g. 10 hours"
								value={formData.Duration}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className="auth-field">
						<label htmlFor="course-level">Level</label>
						<select
							id="course-level"
							name="level"
							value={formData.level}
							onChange={handleChange}
						>
							<option value="Beginner">Beginner</option>
							<option value="Intermediate">Intermediate</option>
							<option value="Advanced">Advanced</option>
						</select>
					</div>

					<div className="auth-field">
						<label htmlFor="course-image">Image URL</label>
						<input
							id="course-image"
							name="image"
							type="text"
							placeholder="https://example.com/image.jpg"
							value={formData.image}
							onChange={handleChange}
						/>
					</div>

					<div className="auth-actions">
						<button type="submit" disabled={loading}>
							{loading ? 'Adding...' : 'Add Course'}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default AddCourse;
