import { NavLink } from 'react-router-dom'

const Footer = () => {
	const year = new Date().getFullYear()

	return (
		<footer className="footer">
			<div className="footer-brand">
				<p className="eyebrow">CourseHub</p>
				<p>Simple course app with login and signup pages.</p>
			</div>

			<nav aria-label="Footer" className="footer-links">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/dashboard">Dashboard</NavLink>
				<NavLink to="/login">Login</NavLink>
				<NavLink to="/signup">Sign Up</NavLink>
			</nav>

			<p className="footer-note">© {year} CourseHub. Built for learning and practice.</p>
		</footer>
	)
}

export default Footer
