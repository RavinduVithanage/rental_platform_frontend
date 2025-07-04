import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/common/PrivateRoute";
import AdminRoute from "./components/common/AdminRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Listings from "./pages/Listings";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserDashboard from "./pages/User/Dashboard";
import AdminDashboard from "./pages/Admin/Dashboard";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Routes, Route } from "react-router-dom";
import UserProfile from './pages/User/Profile';

function App() {


  return (

      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="/user/profile" element={<UserProfile/>} />
              </Route>

              <Route element={<AdminRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
  );
}

export default App;

