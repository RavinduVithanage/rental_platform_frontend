import { BrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/common/PrivateRoute";
import AdminRoute from "./components/common/AdminRoute";
import ScrollToTop from "./components/common/ScrollToTop";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Routes, Route, useLocation } from "react-router-dom";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Listings = lazy(() => import("./pages/Listings"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const UserDashboard = lazy(() => import("./pages/User/Dashboard"));
const UserProfile = lazy(() => import("./pages/User/Profile"));
const AdminDashboard = lazy(() => import("./pages/Admin/Dashboard"));

// Loading spinner component
function PageLoader() {
  return (
    <div className="fixed inset-0 bg-[#030712] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 animate-spin"></div>
        </div>
        <p className="text-slate-400 text-sm font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

// Layout component that conditionally shows Navbar/Footer
function Layout({ children }) {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');
  
  if (isDashboard) {
    return <>{children}</>;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 antialiased">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {


  return (

      <AuthProvider>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
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
          </Suspense>
        </Layout>
      </AuthProvider>
  );
}

export default App;

