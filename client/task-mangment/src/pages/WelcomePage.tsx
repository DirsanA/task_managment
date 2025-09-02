import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="top-0 right-0 left-0 absolute bg-blue-600/5 h-64"></div>
        <div className="top-0 right-0 absolute bg-blue-500/5 rounded-full w-96 h-96 -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <Header />

      {/* Hero Section - Centered Content */}
      <div className="z-10 relative flex flex-grow justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center w-full max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 mb-6 px-4 py-0 rounded-full">
            <Sparkles className="text-blue-600" size={18} />
            <span className="font-medium text-blue-700 text-sm">
              The Professional Task Manager
            </span>
          </div>

          <h1 className="mb-6 font-bold text-gray-900 text-4xl md:text-5xl lg:text-6xl leading-tight">
            Streamline Your
            <span className="block text-blue-600">Workflow</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-gray-600 text-xl leading-relaxed">
            TaskFlow helps professionals and teams organize tasks, track
            progress, and achieve goals with precision. Experience
            enterprise-grade task management with an intuitive interface.
          </p>

          <div className="flex sm:flex-row flex-col gap-4">
            <button
              onClick={() => navigate("/login")}
              className="group flex justify-center items-center gap-3 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl px-8 py-4 rounded-xl font-semibold text-white transition-all"
            >
              Get Started{" "}
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
