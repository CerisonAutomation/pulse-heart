import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const BRAND_IMAGE = 'https://storage1.machobb.com/mbb/a/0/9/63163824c790a/600x300.png';

const LoadingPage = () => {
  const navigate = useNavigate();
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    document.title = 'FIND YOUR KING — Loading';
    
    // Auto-redirect after 2 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    // Show fallback link after 3 seconds in case redirect fails
    const fallbackTimer = setTimeout(() => {
      setShowFallback(true);
    }, 3000);

    return () => {
      clearTimeout(redirectTimer);
      clearTimeout(fallbackTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        {/* Brand Image */}
        <img
          src={BRAND_IMAGE}
          alt="FIND YOUR KING logo/banner"
          className="w-[70%] max-w-[360px] h-auto object-contain mb-8"
          width={360}
          height={180}
        />

        {/* Loading Text */}
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-6">
          Loading FIND YOUR KING…
        </h1>

        {/* Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="h-10 w-10 text-blue-600" />
        </motion.div>

        {/* Fallback Link */}
        {showFallback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <Link
              to="/home"
              className="text-blue-600 hover:text-blue-800 underline font-medium"
            >
              Continue to Home →
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LoadingPage;
