import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import ThemeButton from './ThemeButton';

const Navbar = () => {
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault();
		setUser(null);
		localStorage.removeItem('user');
		navigate('/login');
	};

	return (
		<header className="navbar">
			<NavLink to="/" className="brand">
				<span>CourseHub</span>
			</NavLink>
			<div className="navbar-actions">
				<ThemeButton />
				<nav aria-label="Primary" className="nav-links">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/about">About</NavLink>
					{user ? (
						<>
							<NavLink to="/dashboard">Dashboard</NavLink>
							<span style={{
								fontSize: '0.9rem',
								padding: '8px 12px',
								color: 'var(--text-light)',
								opacity: 0.8
							}}>
								Hi, {user.fname}
							</span>
							<a href="#" onClick={handleLogout}>Logout</a>
						</>
					) : (
						<>
							<NavLink to="/login">Login</NavLink>
							<NavLink to="/signup">Sign Up</NavLink>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
