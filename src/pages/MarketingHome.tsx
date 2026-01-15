import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Contact, PlusCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlobalHeader } from '@/components/marketing/GlobalHeader';
import { GlobalFooter } from '@/components/marketing/GlobalFooter';
import { QuickLinkCard } from '@/components/marketing/QuickLinkCard';
import { CookieConsent } from '@/components/marketing/CookieConsent';

const BRAND_IMAGE = 'https://storage1.machobb.com/mbb/a/0/9/63163824c790a/600x300.png';

const quickLinks = [
  {
    title: 'Profiles',
    description: 'Browse and manage profiles',
    path: '/profiles-stub',
    icon: Users,
  },
  {
    title: 'My messages',
    description: 'View and send messages',
    path: '/messages-stub',
    icon: MessageSquare,
  },
  {
    title: 'My contacts',
    description: 'Manage your contacts',
    path: '/contacts-stub',
    icon: Contact,
  },
  {
    title: 'New',
    description: 'Create new content',
    path: '/new-stub',
    icon: PlusCircle,
    isPrimary: true,
  },
  {
    title: 'My account and settings',
    description: 'Update your account preferences',
    path: '/account-stub',
    icon: Settings,
  },
];

const MarketingHome = () => {
  useEffect(() => {
    document.title = 'FIND YOUR KING — Home page';
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GlobalHeader />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Brand Image */}
              <img
                src={BRAND_IMAGE}
                alt="FIND YOUR KING logo/banner"
                className="w-[90%] max-w-[600px] h-auto mx-auto mb-8 object-contain"
                width={600}
                height={300}
              />

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                FIND YOUR KING
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Dates, Friends, Love for everyone. Connect with like-minded people in a safe and welcoming community.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/profiles-stub">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold"
                  >
                    Profiles
                  </Button>
                </Link>
                <Link to="/messages-stub">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold"
                  >
                    My messages
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
                Quick links
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <QuickLinkCard {...link} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <GlobalFooter />
      <CookieConsent />
    </div>
  );
};

export default MarketingHome;
