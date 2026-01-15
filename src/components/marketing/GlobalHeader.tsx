import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const BRAND_IMAGE = 'https://storage1.machobb.com/mbb/a/0/9/63163824c790a/600x300.png';

const navItems = [
  { label: 'Home page', path: '/home' },
  { label: 'Profiles', path: '/profiles-stub' },
  { label: 'My messages', path: '/messages-stub' },
  { label: 'My contacts', path: '/contacts-stub' },
  { label: 'New', path: '/new-stub', isPrimary: true },
  { label: 'My account and settings', path: '/account-stub' },
];

export const GlobalHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/home" className="flex items-center gap-3">
            <img
              src={BRAND_IMAGE}
              alt="FIND YOUR KING logo/banner"
              className="h-9 w-auto object-contain"
              width={180}
              height={36}
            />
            <span className="hidden sm:block text-lg font-bold text-slate-900">
              FIND YOUR KING
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation">
            {navItems.map((item) => (
              item.isPrimary ? (
                <Link key={item.path} to={item.path}>
                  <Button
                    className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    {item.label}
                  </Button>
                </Link>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-200"
          >
            <nav className="px-4 py-4 space-y-2" role="navigation">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    item.isPrimary
                      ? 'bg-blue-600 text-white text-center'
                      : isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default GlobalHeader;
