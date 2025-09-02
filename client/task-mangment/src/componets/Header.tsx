import { Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="z-10 relative bg-transparent">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Rocket className="text-white" size={28} />
            </div>
            <span className="font-bold text-blue-900 text-2xl">TaskFlow</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg px-5 py-2.5 rounded-lg font-medium text-white text-sm transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
