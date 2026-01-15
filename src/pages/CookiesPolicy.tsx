import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlobalHeader } from '@/components/marketing/GlobalHeader';
import { GlobalFooter } from '@/components/marketing/GlobalFooter';

const CookiesPolicy = () => {
  useEffect(() => {
    document.title = 'Cookies Policy | FIND YOUR KING';
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GlobalHeader />

      <main className="flex-1 pt-16">
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">
                Cookies Policy
              </h1>

              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 mb-6">
                  This Cookies Policy explains how FIND YOUR KING uses cookies and similar 
                  technologies to recognize you when you visit our platform.
                </p>

                <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
                  What are cookies?
                </h2>
                <p className="text-slate-600 mb-4">
                  Cookies are small data files that are placed on your computer or mobile device 
                  when you visit a website. They are widely used to make websites work more 
                  efficiently and to provide information to the owners of the site.
                </p>

                <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
                  How we use cookies
                </h2>
                <p className="text-slate-600 mb-4">
                  We use cookies to maintain your user session and generate statistics about 
                  how our platform is used. This helps us improve our services and provide 
                  you with a better experience.
                </p>

                <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
                  Types of cookies we use
                </h2>
                <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                  <li>
                    <strong>Essential cookies:</strong> Required for the platform to function properly
                  </li>
                  <li>
                    <strong>Analytics cookies:</strong> Help us understand how visitors use our platform
                  </li>
                  <li>
                    <strong>Preference cookies:</strong> Remember your settings and preferences
                  </li>
                </ul>

                <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
                  Managing cookies
                </h2>
                <p className="text-slate-600 mb-4">
                  You can control and manage cookies in various ways. Please note that removing 
                  or blocking cookies may impact your user experience and parts of our platform 
                  may no longer be fully accessible.
                </p>

                <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
                  Contact us
                </h2>
                <p className="text-slate-600">
                  If you have any questions about our use of cookies, please contact us at 
                  privacy@findyourking.com.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default CookiesPolicy;
