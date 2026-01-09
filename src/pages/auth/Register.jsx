import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";

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
    <div className="min-h-screen relative overflow-hidden pt-20">
      {/* Background with gradient and animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-70 animate-pulse"
              style={{
                left: `${15 + i * 15}%`,
                top: `${10 + i * 12}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen">
        {/* Header */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-2xl">🏖️</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Join FasoRent
            </span>
          </h2>

          <p className="text-xl text-gray-200 mb-4">
            Start your Sri Lankan adventure today
          </p>

          <p className="text-gray-300">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text hover:from-cyan-300 hover:to-blue-400 transition-all duration-300"
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* Form Container */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10">
            {error && (
              <div className="mb-6 bg-red-500/20 backdrop-blur-sm border border-red-400/50 rounded-xl p-4">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-300 mr-3"
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
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">
                  Full Name
                </label>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-300 focus:ring-orange-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">
                  Email Address
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-300 focus:ring-orange-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-300 focus:ring-orange-500"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Confirm your password"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-300 focus:ring-orange-500"
                />
              </div>

              {/* Account Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">
                  Account Type
                </label>
                <Select
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-white/10 border-white/20 text-white focus:ring-orange-500"
                >
                  <option value="client" className="bg-gray-800 text-white">
                    🏖️ Tourist (Looking to rent)
                  </option>
                  <option
                    value="rental_user"
                    className="bg-gray-800 text-white"
                  >
                    🏠 Rental Provider (Want to list items)
                  </option>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full ${
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
              </Button>
            </div>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/10 backdrop-blur-sm rounded-full text-gray-300">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full inline-flex justify-center"
                >
                  <svg
                    className="w-5 h-5 text-blue-400 group-hover:text-blue-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-sm font-medium text-gray-200 group-hover:text-white">
                    Facebook
                  </span>
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  className="w-full inline-flex justify-center"
                >
                  <svg
                    className="w-5 h-5 text-red-400 group-hover:text-red-300"
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
                  <span className="ml-2 text-sm font-medium text-gray-200 group-hover:text-white">
                    Google
                  </span>
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400">
                By creating an account, you agree to our{" "}
                <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
