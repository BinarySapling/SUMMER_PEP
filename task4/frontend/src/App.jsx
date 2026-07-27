import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import InstructorCourses from "./pages/InstructorCourses";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Enrolled from "./pages/Enrolled.jsx";
import AddCourse from "./pages/AddCourse.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

import "./App.css";

const Layout = () => (
  <>
    <Navbar />

    <main className="main-content">
      <Outlet />
    </main>

    <Footer />
  </>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/instructor/mycourses"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <InstructorCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/enrolled"
            element={
              <ProtectedRoute>
                <Enrolled />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-course"
            element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <AddCourse />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}