import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Heart, Coffee, Users, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlobalHeader } from '@/components/marketing/GlobalHeader';
import { GlobalFooter } from '@/components/marketing/GlobalFooter';
import { CookieConsent } from '@/components/marketing/CookieConsent';

const openRoles = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Berlin / Remote',
    type: 'Full-time',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Amsterdam',
    type: 'Full-time',
  },
  {
    title: 'Community Manager',
    department: 'Community',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Data Analyst',
    department: 'Analytics',
    location: 'Berlin',
    type: 'Full-time',
  },
];

const benefits = [
  { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health insurance and wellness programs' },
  { icon: Coffee, title: 'Flexible Work', description: 'Work from home or our beautiful offices' },
  { icon: Users, title: 'Inclusive Culture', description: 'A diverse and welcoming team environment' },
  { icon: Laptop, title: 'Latest Tech', description: 'Top-of-the-line equipment and tools' },
];

const JobsPage = () => {
  useEffect(() => {
    document.title = 'FIND YOUR KING Wants You! | Careers at FIND YOUR KING';
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GlobalHeader />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                FIND YOUR KING Wants You!
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                We're looking for talent. Are you the one? At FIND YOUR KING, you'll be part 
                of a passionate team building connections for people worldwide.
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold"
              >
                View Open Roles
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Open Roles Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
                Open Positions
              </h2>

              <div className="space-y-4">
                {openRoles.map((role, index) => (
                  <motion.div
                    key={role.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {role.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {role.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {role.location}
                          </span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {role.type}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                        Apply Now
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
                Why Work at FIND YOUR KING?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl border border-gray-200 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                      <benefit.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Offices Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
                Our Offices
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900">Amsterdam</h3>
                    <p className="text-slate-600">Netherlands</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900">Berlin</h3>
                    <p className="text-slate-600">Germany</p>
                  </div>
                </div>
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

export default JobsPage;
