import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 mt-auto border-gray-200 border-t">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        {/* Top Section */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-6">
          {/* Brand */}
          <div className="md:text-left text-center">
            <h2 className="font-bold text-gray-800 text-lg">TaskFlow</h2>
            <p className="mt-1 text-gray-500 text-sm">
              Organize your tasks. Boost your productivity.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Contact
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-gray-600">
            <a href="#" className="hover:text-blue-600">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:text-blue-600">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-blue-600">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-blue-600">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
