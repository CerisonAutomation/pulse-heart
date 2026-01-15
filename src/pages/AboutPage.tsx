import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, Globe } from 'lucide-react';
import { GlobalHeader } from '@/components/marketing/GlobalHeader';
import { GlobalFooter } from '@/components/marketing/GlobalFooter';
import { CookieConsent } from '@/components/marketing/CookieConsent';

const values = [
  {
    icon: Heart,
    title: 'Dates, Friends & Love',
    description: 'We believe everyone deserves connection. Our platform brings people together for meaningful relationships.',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Your safety and privacy are our top priorities. We maintain strict community guidelines and verification systems.',
  },
  {
    icon: Users,
    title: 'Inclusive Community',
    description: 'We celebrate diversity and welcome everyone. Our community is built on respect and acceptance.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Connect with people worldwide. Our platform spans across continents, bringing the world closer together.',
  },
];

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About FIND YOUR KING | Dates, Friends & Love for Everyone';
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GlobalHeader />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Dates, Friends & Love for Everyone
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
                We at FIND YOUR KING are a diverse team of passionate individuals dedicated to 
                creating the most welcoming and inclusive dating platform in the world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8">
                Our Mission
              </h2>
              <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto leading-relaxed">
                Since our founding, we've been committed to providing a safe, respectful, and 
                empowering space for people to connect. We believe that everyone deserves to 
                find meaningful relationships, whether that's romance, friendship, or simply 
                a sense of community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
                Our Values
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-blue-100">
                        <value.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          {value.title}
                        </h3>
                        <p className="text-slate-600">
                          {value.description}
                        </p>
                      </div>
                    </div>
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

export default AboutPage;
