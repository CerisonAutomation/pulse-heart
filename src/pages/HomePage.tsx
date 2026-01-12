import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Check, Shield, MessageCircle, Star, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { CookieConsent } from '@/components/marketing/CookieConsent';

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const HomePage = () => {
  const features = [
    { icon: Shield, text: 'No censorship - express yourself freely' },
    { icon: MessageCircle, text: 'Real-time chat with instant notifications' },
    { icon: Star, text: 'Free + Premium options available' },
    { icon: Check, text: 'Verified profiles for authentic connections' },
    { icon: Zap, text: 'Fast matching algorithm' },
    { icon: Users, text: 'Active community worldwide' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      <MarketingHeader />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://storage1.machobb.com/mbb/3/6/0/6852da1490063/0-home-landing.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/70 via-[#0B0B0D]/50 to-[#0B0B0D]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-['Montserrat'] uppercase tracking-tight">
              Free gay dating app and gay chat for barebackers with{' '}
              <span className="text-[#E53945]">no awkward questions</span>, no censorship and no time wasters.
            </h1>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#E53945]">
                  <AnimatedCounter end={709170} />
                </div>
                <div className="text-sm text-[#B9BDC7]">profiles created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#FF6B6B]">
                  <AnimatedCounter end={16981} />
                </div>
                <div className="text-sm text-[#B9BDC7]">connected users</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                asChild
                className="bg-[#E53945] hover:bg-[#FF6B6B] text-white font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:scale-105"
              >
                <Link to="/connect?mode=register">Free registration</Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="border-white/30 hover:border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300"
              >
                <Link to="/connect">Login</Link>
              </Button>
            </div>

            {/* App Store Badge */}
            <a href="#" className="inline-block hover:opacity-80 transition-opacity">
              <img 
                src="https://Machobb.com/img/badge_appstore_en.svg" 
                alt="Download on the App Store" 
                className="h-12"
              />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B0D]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Features List */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 font-['Montserrat'] uppercase">
                Best Free or <span className="text-[#E53945]">Premium</span> Features
              </h2>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-[#141418] hover:bg-[#1a1a1f] transition-colors border border-[#2A2E35]"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E53945]/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-[#E53945]" />
                    </div>
                    <span className="text-[#B9BDC7]">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Stacked Images */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative">
                {/* Back image (mockup) */}
                <img 
                  src="https://storage1.machobb.com/mbb/8/f/3/6852e2e6a63f8/2-mockup-landing.png" 
                  alt="MACHOBB app mockups showing the mobile interface"
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                  loading="lazy"
                />
                {/* Front image (features) - overlapping */}
                <img 
                  src="https://storage1.machobb.com/mbb/7/0/5/6852e3aac0507/1-features-landing.png" 
                  alt="MACHOBB premium features showcase"
                  className="absolute top-8 right-0 w-2/3 max-w-xs drop-shadow-2xl"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Influencer Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#141418]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-['Montserrat'] uppercase">
              Are you an <span className="text-[#E53945]">influencer</span>?
            </h2>
            <p className="text-[#B9BDC7] text-lg max-w-2xl mx-auto mb-8">
              Earn by promoting MACHOBB. Join our ambassador program and get rewarded for every user you bring to our platform.
            </p>
            <Button className="bg-[#E53945] hover:bg-[#FF6B6B] text-white font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:scale-105">
              Become an Ambassador
            </Button>
          </motion.div>

          {/* Two-up image grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://storage1.machobb.com/mbb/a/f/6/6853462dd56fa/3-inluencer-landing.png" 
                alt="Influencer promotional graphic showing earning potential"
                className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <img 
                src="https://storage1.machobb.com/mbb/a/7/e/68534fed1ee7a/4-inluencer-landing.png" 
                alt="Influencer promotional graphic showing ambassador benefits"
                className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-8 px-4 bg-[#0B0B0D]">
        <div className="max-w-4xl mx-auto">
          <Link to="/connect?mode=register" className="block hover:opacity-90 transition-opacity">
            <img 
              src="https://storage1.machobb.com/mbb/4/d/8/63163822b88d4/600x150.png" 
              alt="MACHOBB promotional banner - Join now"
              className="w-full max-w-[600px] mx-auto"
              loading="lazy"
            />
          </Link>
        </div>
      </section>

      <MarketingFooter />
      <CookieConsent />
    </div>
  );
};

export default HomePage;
