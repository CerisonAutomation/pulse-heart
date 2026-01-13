import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { 
  Check, Shield, MessageCircle, Star, Zap, Users, Crown, 
  Heart, MapPin, Calendar, Sparkles, ArrowRight, Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const features = [
  { icon: Crown, title: 'Premium Experience', desc: 'Exclusive features for discerning users' },
  { icon: Shield, title: 'Verified Profiles', desc: '100% authentic, verified members' },
  { icon: MessageCircle, title: 'Real-time Chat', desc: 'Instant messaging with reactions' },
  { icon: MapPin, title: 'Live Map', desc: 'See who\'s nearby right now' },
  { icon: Calendar, title: 'Events & Meetups', desc: 'Gym buddies, coffee dates & more' },
  { icon: Heart, title: 'Smart Matching', desc: 'AI-powered compatibility' },
];

const testimonials = [
  { name: 'Alex M.', location: 'NYC', text: 'Finally found my gym partner! Best app ever.', rating: 5 },
  { name: 'Jordan K.', location: 'LA', text: 'The events feature changed my social life.', rating: 5 },
  { name: 'Sam R.', location: 'Miami', text: 'Premium is worth every penny. Highly recommend!', rating: 5 },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Crown className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">Find Your King</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/connect">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/connect?mode=register">
              <Button className="gradient-primary">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />
        
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">#1 Dating App</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Find Your{' '}
                <span className="text-gradient">King</span>
                <br />
                Live Your Best Life
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Connect with amazing people nearby. Events, parties, gym buddies, and more. 
                Your kingdom awaits.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary">
                    <AnimatedCounter end={500000} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-accent">
                    <AnimatedCounter end={10000} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground">Daily Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-gold">
                    4.9
                  </div>
                  <div className="text-sm text-muted-foreground">App Rating</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/connect?mode=register">
                  <Button size="lg" className="gradient-primary px-8 py-6 text-lg">
                    Start Free
                    <Crown className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg group">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            {/* Right - App Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 blur-3xl scale-110" />
                
                {/* Phone Mockup */}
                <div className="relative bg-card rounded-[3rem] p-2 border border-border/50 shadow-2xl mx-auto max-w-[320px]">
                  <div className="bg-background rounded-[2.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="h-8 bg-background flex items-center justify-center">
                      <div className="w-20 h-5 bg-card rounded-full" />
                    </div>
                    
                    {/* App Content Preview */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-card/50">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent" />
                        <div>
                          <div className="h-4 w-24 bg-muted rounded" />
                          <div className="h-3 w-16 bg-muted/50 rounded mt-1" />
                        </div>
                        <div className="ml-auto">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-end p-2">
                            <div className="w-full">
                              <div className="h-3 w-16 bg-white/20 rounded" />
                              <div className="h-2 w-12 bg-white/10 rounded mt-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Nav Preview */}
                    <div className="h-16 border-t border-border/30 flex items-center justify-around px-6">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`w-8 h-8 rounded-lg ${i === 1 ? 'bg-primary/20' : 'bg-muted/30'}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 p-3 rounded-2xl bg-card border border-border/50 shadow-lg"
                >
                  <Heart className="w-6 h-6 text-primary" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute bottom-20 -left-8 p-3 rounded-2xl bg-card border border-border/50 shadow-lg"
                >
                  <MapPin className="w-6 h-6 text-accent" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to{' '}
              <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium features designed for meaningful connections
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by <span className="text-gradient">Kings</span> Everywhere
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-gradient-to-br from-primary/20 via-card to-accent/20 border border-border/50"
          >
            <Crown className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Find Your King?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of amazing people connecting every day. Your kingdom awaits.
            </p>
            <Link to="/connect?mode=register">
              <Button size="lg" className="gradient-primary px-12 py-6 text-lg">
                Get Started Free
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-primary" />
              <span className="font-bold">Find Your King</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Find Your King. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
