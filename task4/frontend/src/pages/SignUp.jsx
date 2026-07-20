import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const SignUp = () => {
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		fname: '',
		lname: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		if (error) setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { fname, lname, email, password, confirmPassword } = formData;

		if (!fname || !lname || !email || !password || !confirmPassword) {
			setError('All fields are required');
			return;
		}

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		try {
			setError('');
			setLoading(true);
			const response = await fetch('http://localhost:3000/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ fname, lname, email, password, confirmPassword })
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Signup failed');
			}

			const userData = {
				id: data.user.id,
				fname: data.user.fname,
				lname: data.user.lname,
				email: data.user.email,
				token: data.token
			};
			setUser(userData);
			localStorage.setItem('user', JSON.stringify(userData));

			navigate('/dashboard');
		} catch (err) {
			setError(err.message || 'Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="page-card card-panel auth-page" id="signup">
			<div className="auth-card">
				<p className="eyebrow">Sign Up</p>
				<h2>Create your account</h2>

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

				<form className="auth-form" onSubmit={handleSubmit}>
					<div className="auth-field auth-field-row">
						<div>
							<label htmlFor="signup-first-name">First Name</label>
							<input
								id="signup-first-name"
								name="fname"
								type="text"
								value={formData.fname}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							<label htmlFor="signup-last-name">Last Name</label>
							<input
								id="signup-last-name"
								name="lname"
								type="text"
								value={formData.lname}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div className="auth-field">
						<label htmlFor="signup-email">Email</label>
						<input
							id="signup-email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="auth-field">
						<label htmlFor="signup-password">Password</label>
						<input
							id="signup-password"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="auth-field">
						<label htmlFor="signup-confirm-password">Confirm Password</label>
						<input
							id="signup-confirm-password"
							name="confirmPassword"
							type="password"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="auth-actions">
						<button type="submit" disabled={loading}>
							{loading ? 'Signing Up...' : 'Sign Up'}
						</button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default SignUp
