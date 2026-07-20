import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Dashboard = () => {
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	const handleLogout = () => {
		setUser(null);
		localStorage.removeItem('user');
		navigate('/login');
	};

	return (
		<section className="page-card card-panel" id="dashboard">
			<p className="eyebrow">Dashboard</p>
			<h2>Welcome, {user.fname} {user.lname}!</h2>
			
			<div style={{
				marginTop: '20px',
				padding: '20px',
				border: '1px solid rgba(127, 127, 127, 0.15)',
				borderRadius: '8px',
				maxWidth: '450px'
			}}>
				<h3 style={{ margin: '0 0 16px 0', borderBottom: '1px solid rgba(127, 127, 127, 0.15)', paddingBottom: '8px' }}>
					Profile Information
				</h3>
				<p style={{ margin: '8px 0' }}>
					<strong>First Name:</strong> {user.fname}
				</p>
				<p style={{ margin: '8px 0' }}>
					<strong>Last Name:</strong> {user.lname}
				</p>
				<p style={{ margin: '8px 0' }}>
					<strong>Email Address:</strong> {user.email}
				</p>
				
				<button 
					onClick={handleLogout}
					style={{
						marginTop: '20px',
						backgroundColor: '#e74c3c',
						color: '#fff',
						border: 'none',
						padding: '10px 16px',
						borderRadius: '6px',
						cursor: 'pointer'
					}}
				>
					Log Out
				</button>
			</div>
		</section>
	);
};

export default Dashboard;
