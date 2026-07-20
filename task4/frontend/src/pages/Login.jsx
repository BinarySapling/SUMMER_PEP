import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
		password: ''
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
		const { email, password } = formData;

		if (!email || !password) {
			setError('Email and password are required');
			return;
		}

		try {
			setError('');
			setLoading(true);
			const response = await fetch('http://localhost:3000/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Login failed');
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
		<section className="page-card card-panel auth-page" id="login">
			<div className="auth-card">
				<p className="eyebrow">Login</p>
				<h2>Sign in to your account</h2>

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
					<div className="auth-field">
						<label htmlFor="login-email">Email</label>
						<input
							id="login-email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="auth-field">
						<label htmlFor="login-password">Password</label>
						<input
							id="login-password"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="auth-actions">
						<button type="submit" disabled={loading}>
							{loading ? 'Logging in...' : 'Login'}
						</button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Login
