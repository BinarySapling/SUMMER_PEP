import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import ThemeButton from './ThemeButton';

const Navbar = () => {
	const { user, setUser } = useContext(UserContext);
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault();
		setUser(null);
		localStorage.removeItem('user');
		setIsOpen(false);
		navigate('/login');
	};

	const closeMenu = () => setIsOpen(false);

	return (
		<header className="navbar">
			<NavLink to="/" className="brand" onClick={closeMenu}>
				<span>CourseHub</span>
			</NavLink>

			<div className="navbar-right">
				<ThemeButton />
				<button 
					className="menu-toggle" 
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Toggle navigation menu"
				>
					{isOpen ? '✕' : '☰'}
				</button>
			</div>

			<nav className={`nav-links ${isOpen ? 'open' : ''}`}>
				<NavLink to="/" onClick={closeMenu}>Home</NavLink>
				<NavLink to="/about" onClick={closeMenu}>About</NavLink>
				{user ? (
					<>
						<NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
						<NavLink to="/enrolled" onClick={closeMenu}>Enrolled Courses</NavLink>
						<span className="user-greeting">
							Hi, {user.fname}
						</span>
						<a href="#" onClick={handleLogout}>Logout</a>
					</>
				) : (
					<>
						<NavLink to="/login" onClick={closeMenu}>Login</NavLink>
						<NavLink to="/signup" onClick={closeMenu}>Sign Up</NavLink>
					</>
				)}
			</nav>
		</header>
	);
};

export default Navbar;
