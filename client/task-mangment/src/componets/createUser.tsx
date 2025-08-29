import { useState } from "react";
import axios from "axios";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const userResponse = await axios.post("http://localhost:3000/postUser", {
        name,
        email,
        password,
      });
      console.log(userResponse);
      setName("");
      setEmail("");
      setPassword("");
      setSuccessMessage("Account created successfully!");
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-green-50 to-cyan-100 p-4 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-400 to-cyan-500 p-6 text-white text-center">
          <h1 className="font-bold text-2xl">Create Your Account</h1>
          <p className="opacity-90 mt-2">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
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

          <div className="space-y-4">
            <div className="relative">
              <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                placeholder="Full Name"
                className="py-3 pr-4 pl-10 border border-gray-200 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 w-full transition"
              />
            </div>

            <div className="relative">
              <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder="Email Address"
                className="py-3 pr-4 pl-10 border border-gray-200 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 w-full transition"
              />
            </div>

            <div className="relative">
              <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required
                value={password}
                placeholder="Password"
                className="py-3 pr-12 pl-10 border border-gray-200 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 w-full transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="right-0 absolute inset-y-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-green-500 hover:from-green-600 to-cyan-500 hover:to-cyan-600 disabled:opacity-70 shadow-md hover:shadow-lg py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 w-full font-semibold text-white transition disabled:cursor-not-allowed"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="mt-4 text-gray-500 text-sm text-center">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-green-500 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-500 hover:underline">
              Privacy Policy
            </a>
            .
          </div>
        </form>

        <div className="bg-gray-50 p-4 border-gray-100 border-t text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-green-500 hover:text-green-600"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
