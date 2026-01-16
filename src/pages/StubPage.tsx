import { useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import { GlobalHeader } from '@/components/marketing/GlobalHeader';
import { GlobalFooter } from '@/components/marketing/GlobalFooter';

interface StubPageProps {
  title: string;
}

const StubPage = forwardRef<HTMLDivElement, StubPageProps>(({ title }, ref) => {
  useEffect(() => {
    document.title = `FIND YOUR KING — ${title}`;
  }, [title]);

  return (
    <div ref={ref} className="min-h-screen bg-white flex flex-col">
      <GlobalHeader />

      <main className="flex-1 pt-16 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
            <Construction className="h-10 w-10 text-blue-600" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {title}
          </h1>
          
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Coming soon. This feature is currently under development.
          </p>
        </motion.div>
      </main>

      <GlobalFooter />
    </div>
  );
});

StubPage.displayName = 'StubPage';

export default StubPage;
