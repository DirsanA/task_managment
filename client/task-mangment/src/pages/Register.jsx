import { useState } from "react";
import axios from "axios";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:3000/postUser", {
        name,
        email,
        password,
      });
      console.log(response);
      setEmail("");
      setPassword("");
      setName("");
      setSuccessMessage("Registered successfully!");
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to Register.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 min-h-screen">
      <div className="bg-white shadow-xl hover:shadow-2xl rounded-2xl w-full max-w-md overflow-hidden transition">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white text-center">
          <h1 className="font-bold text-2xl">Create Account ✨</h1>
          <p className="opacity-90 mt-2">
            Register and start your journey today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {successMessage && (
            <div className="flex items-start gap-2 bg-green-50 p-3 rounded-lg text-green-700">
              <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm">{successMessage}</p>
            </div>
          )}

          {errorMessage && (
            <div className="flex items-start gap-2 bg-red-50 p-3 rounded-lg text-red-700">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Name */}
          <div className="relative">
            <input
              type="text"
              required
              value={name}
              onChange={function (e) {
                setName(e.target.value);
              }}
              placeholder="Full Name"
              className="px-4 py-3 border border-gray-200 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-400 w-full transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail
              size={18}
              className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Email Address"
              className="py-3 pr-4 pl-10 border border-gray-200 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-400 w-full transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={18}
              className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              required
              value={password}
              placeholder="Password"
              className="py-3 pr-12 pl-10 border border-gray-200 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-400 w-full transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="top-1/2 right-3 absolute text-gray-400 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock
              size={18}
              className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2"
            />
            <input
              type="password"
              required
              placeholder="Confirm Password"
              className="py-3 pr-4 pl-10 border border-gray-200 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-400 w-full transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 hover:from-blue-600 to-indigo-500 hover:to-indigo-600 disabled:opacity-70 shadow-md hover:shadow-lg py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 w-full font-semibold text-white transition disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex justify-center items-center">
                <svg
                  className="mr-2 -ml-1 w-4 h-4 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 
                 0 5.373 0 12h4zm2 5.291A7.962 7.962 
                 0 014 12H0c0 3.042 1.135 5.824 
                 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </span>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-500 hover:text-blue-600"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
