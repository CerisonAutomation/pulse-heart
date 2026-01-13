import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Sparkles, Crown, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ConnectPage = () => {
  const [searchParams] = useSearchParams();
  const isRegisterMode = searchParams.get('mode') === 'register';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(isRegisterMode);
  const [isMagicLink, setIsMagicLink] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const { toast } = useToast();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/app`,
        },
      });

      if (error) throw error;

      setMagicLinkSent(true);
      toast({
        title: "Magic link sent! ✨",
        description: "Check your email for a login link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send magic link.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isMagicLink) {
      return handleMagicLink(e);
    }

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
          title: "Welcome to the kingdom! 👑",
          description: "Check your email to verify your account.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back, King! 👑",
          description: "You have been logged in successfully.",
        });
        
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

  if (magicLinkSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Check your inbox! 📬</h1>
          <p className="text-muted-foreground">
            We've sent a magic link to <strong>{email}</strong>. Click the link to sign in instantly.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setMagicLinkSent(false);
              setEmail('');
            }}
          >
            Use a different email
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <Crown className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">Find Your King</span>
          </Link>
        </div>
      </header>
      
      <main className="min-h-screen flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-3xl p-8 border border-border/50 shadow-xl"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Crown className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold mb-2">
                {isRegister ? 'Join the Kingdom' : 'Welcome Back, King'}
              </h1>
              <p className="text-muted-foreground">
                {isRegister 
                  ? 'Create your royal profile' 
                  : 'Your throne awaits'}
              </p>
            </div>

            {/* Magic Link Option */}
            <div className="mb-6">
              <Button
                type="button"
                variant={isMagicLink ? 'default' : 'outline'}
                className="w-full"
                onClick={() => setIsMagicLink(!isMagicLink)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isMagicLink ? 'Using Magic Link' : 'Use Magic Link (No Password)'}
              </Button>
            </div>

            {!isMagicLink && !isRegister && (
              <>
                <Separator className="my-6" />
                <p className="text-center text-sm text-muted-foreground mb-6">or sign in with password</p>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="king@example.com"
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              {!isMagicLink && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {isRegister && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full gradient-primary py-6 text-lg font-semibold"
              >
                {isLoading ? (
                  'Please wait...'
                ) : isMagicLink ? (
                  <>
                    Send Magic Link
                    <Zap className="w-5 h-5 ml-2" />
                  </>
                ) : isRegister ? (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsRegister(!isRegister);
                  setIsMagicLink(false);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isRegister 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Join us"}
              </button>
            </div>
          </motion.div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { icon: '🔒', label: 'Secure' },
              { icon: '⚡', label: 'Fast' },
              { icon: '👑', label: 'Premium' },
            ].map((feature) => (
              <div key={feature.label} className="p-3 rounded-xl bg-card/50 border border-border/30">
                <span className="text-2xl">{feature.icon}</span>
                <p className="text-xs text-muted-foreground mt-1">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConnectPage;
