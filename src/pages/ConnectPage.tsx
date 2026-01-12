import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { CookieConsent } from '@/components/marketing/CookieConsent';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const tagCloud = [
  'Arabic', 'White', 'Black', 'Mixed', 'Latino', 'Asian', 'Indian', 'Other origins',
  'Twink', 'Macho', 'Feminine', 'Muscled', 'Skinny', 'Bear', 'Jock', 'Daddy',
  'Sneakers', 'Leather', 'Sportswear', 'Underwear',
  'Dominant', 'Submissive', 'Master', 'Slave', 'Versatile',
];

const ConnectPage = () => {
  const [searchParams] = useSearchParams();
  const isRegisterMode = searchParams.get('mode') === 'register';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(isRegisterMode);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please make sure your passwords match.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/app`,
          },
        });

        if (error) throw error;

        toast({
          title: "Registration successful!",
          description: "Please check your email to verify your account.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You have been logged in successfully.",
        });
        
        // Redirect to app
        window.location.href = '/app';
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      <MarketingHeader />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="bg-[#141418] rounded-2xl p-8 border border-[#2A2E35] max-w-md mx-auto lg:mx-0">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2 font-['Montserrat'] uppercase">
                    {isRegister ? 'Create Account' : 'Connect'}
                  </h1>
                  <p className="text-[#B9BDC7]">
                    {isRegister 
                      ? 'Join the community today' 
                      : 'Welcome back to MACHOBB'}
                  </p>
                </div>

                {!isRegister && (
                  <Button 
                    onClick={() => setIsRegister(true)}
                    className="w-full bg-[#E53945] hover:bg-[#FF6B6B] text-white font-semibold py-6 mb-6 rounded-lg transition-all duration-300"
                  >
                    Free registration
                  </Button>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#B9BDC7]">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B9BDC7]" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="pl-10 bg-[#0B0B0D] border-[#2A2E35] focus:border-[#E53945] text-white placeholder:text-[#B9BDC7]/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#B9BDC7]">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B9BDC7]" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="pl-10 pr-10 bg-[#0B0B0D] border-[#2A2E35] focus:border-[#E53945] text-white placeholder:text-[#B9BDC7]/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B9BDC7] hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {isRegister && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-[#B9BDC7]">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B9BDC7]" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="pl-10 bg-[#0B0B0D] border-[#2A2E35] focus:border-[#E53945] text-white placeholder:text-[#B9BDC7]/50"
                        />
                      </div>
                    </div>
                  )}

                  {!isRegister && (
                    <div className="text-right">
                      <a href="#" className="text-sm text-[#E53945] hover:text-[#FF6B6B] transition-colors">
                        I forgot my password
                      </a>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#E53945] hover:bg-[#FF6B6B] text-white font-semibold py-6 rounded-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Login')}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-sm text-[#B9BDC7] hover:text-white transition-colors"
                  >
                    {isRegister 
                      ? 'Already have an account? Login' 
                      : "Don't have an account? Register"}
                  </button>
                </div>
              </div>

              {/* Tag Cloud */}
              <div className="mt-8 max-w-md mx-auto lg:mx-0">
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {tagCloud.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-[#141418] text-[#B9BDC7] text-sm rounded-full border border-[#2A2E35] hover:border-[#E53945] hover:text-[#E53945] transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Illustration Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <img 
                src="https://storage1.machobb.com/mbb/8/f/3/6852e2e6a63f8/2-mockup-landing.png" 
                alt="MACHOBB app interface preview"
                className="w-full max-w-md drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </main>

      <MarketingFooter />
      <CookieConsent />
    </div>
  );
};

export default ConnectPage;
