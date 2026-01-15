import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
          role="region"
          aria-label="Cookie consent"
        >
          <div className="max-w-4xl mx-auto bg-slate-100 rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-700 text-sm text-center sm:text-left">
                We use cookies to maintain your user session and generate statistics. Please see our{' '}
                <Link 
                  to="/cookies"
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                >
                  Cookies Policy
                </Link>{' '}
                for more information.
              </p>
              
              <Button
                onClick={handleAccept}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 whitespace-nowrap"
              >
                I understand
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
