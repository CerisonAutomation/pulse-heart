import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from './LanguageSelector';

export const MarketingHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0D]/90 backdrop-blur-lg border-b border-[#2A2E35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white font-['Montserrat'] tracking-wider">
              MACHOBB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            
            <Button 
              asChild
              variant="ghost"
              className="text-white hover:text-[#E53945] hover:bg-transparent transition-colors"
            >
              <Link to="/connect">Login</Link>
            </Button>
            
            <Button 
              asChild
              className="bg-[#E53945] hover:bg-[#FF6B6B] text-white font-semibold px-6 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Link to="/connect?mode=register">Free registration</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-[#2A2E35]"
          >
            <div className="flex flex-col gap-4">
              <LanguageSelector />
              
              <Link
                to="/connect"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#E53945] py-2 transition-colors"
              >
                Login
              </Link>
              
              <Button 
                asChild
                className="bg-[#E53945] hover:bg-[#FF6B6B] text-white font-semibold rounded-lg"
              >
                <Link to="/connect?mode=register" onClick={() => setIsMobileMenuOpen(false)}>
                  Free registration
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};
