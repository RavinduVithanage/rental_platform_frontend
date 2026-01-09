import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import SearchSelect from "../../components/ui/SearchSelect";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("client");
  const [loading, setLoading] = useState(false);
  const { register, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      return setError("Passwords don't match");
    }

    try {
      setError("");
      setLoading(true);
      const result = await register(
        name,
        email,
        password,
        passwordConfirmation,
        role
      );

      if (result.success) {
        // Redirect based on role
        if (result.user.roles.some((r) => r.name === "admin")) {
          navigate("/admin/dashboard");
        } else if (result.user.roles.some((r) => r.name === "rental_user")) {
          navigate("/user/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-20 bg-[#0a0a0f]">
      {/* Background with gradient and animated elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]"></div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/50 rounded-full"
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${60 + Math.random() * 40}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen">
        {/* Header */}
        <motion.div 
          className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-2xl shadow-2xl shadow-violet-500/30 mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white font-bold text-2xl">🏖️</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Join FasoRent
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-4">
            Start your Sri Lankan adventure today
          </p>

          <p className="text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-violet-400 hover:text-violet-300 transition-all duration-300"
            >
              Sign in here
            </button>
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div 
          className="sm:mx-auto sm:w-full sm:max-w-md px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-[#16162a]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-500/20 p-8 sm:p-10">
            {error && (
              <motion.div 
                className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-400 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              </motion.div>
            )}

            <div className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-[#0a0a0f]/80 border-violet-500/20 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-violet-500/20"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-[#0a0a0f]/80 border-violet-500/20 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-violet-500/20"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="bg-[#0a0a0f]/80 border-violet-500/20 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-violet-500/20"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Confirm your password"
                  className="bg-[#0a0a0f]/80 border-violet-500/20 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-violet-500/20"
                />
              </div>

              {/* Account Type */}
              <div className="space-y-2">
                <SearchSelect
                  label="Account Type"
                  icon="👤"
                  options={[
                    { value: 'client', label: '🏖️ Tourist (Looking to rent)' },
                    { value: 'rental_user', label: '🏠 Rental Provider (Want to list items)' },
                  ]}
                  value={
                    role === 'client' 
                      ? { value: 'client', label: '🏖️ Tourist (Looking to rent)' }
                      : { value: 'rental_user', label: '🏠 Rental Provider (Want to list items)' }
                  }
                  onChange={(option) => setRole(option?.value || 'client')}
                  placeholder="Select account type..."
                  isClearable={false}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Creating your account...
                  </div>
                ) : (
                  "🚀 Create Account"
                )}
              </motion.button>
            </div>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-violet-500/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#16162a] rounded-full text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex justify-center items-center px-4 py-3 rounded-xl bg-[#0a0a0f]/80 border border-violet-500/20 text-gray-300 hover:border-violet-500/40 hover:text-white transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-sm font-medium">
                    Facebook
                  </span>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex justify-center items-center px-4 py-3 rounded-xl bg-[#0a0a0f]/80 border border-violet-500/20 text-gray-300 hover:border-violet-500/40 hover:text-white transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  <span className="ml-2 text-sm font-medium">
                    Google
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{" "}
                <button className="text-violet-400 hover:text-violet-300 transition-colors">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-violet-400 hover:text-violet-300 transition-colors">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
