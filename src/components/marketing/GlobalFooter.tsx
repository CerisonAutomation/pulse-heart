import { Link } from 'react-router-dom';

export const GlobalFooter = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">FIND YOUR KING</span>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <Link to="/home" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookies Policy
            </Link>
          </nav>
          
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} FIND YOUR KING
          </p>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
