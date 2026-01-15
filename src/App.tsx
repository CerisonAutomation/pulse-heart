import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";

// Marketing Pages
import LoadingPage from "./pages/LoadingPage";
import MarketingHome from "./pages/MarketingHome";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import JobsPage from "./pages/JobsPage";
import CookiesPolicy from "./pages/CookiesPolicy";
import StubPage from "./pages/StubPage";

// Legal Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";

// App Pages
import ConnectPage from "./pages/ConnectPage";
import AppLayout from "./pages/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E53945]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/connect" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Marketing Routes */}
      <Route path="/" element={<Navigate to="/loading" replace />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/home" element={<MarketingHome />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      
      {/* Stub Pages */}
      <Route path="/profiles-stub" element={<StubPage title="Profiles" />} />
      <Route path="/messages-stub" element={<StubPage title="My messages" />} />
      <Route path="/contacts-stub" element={<StubPage title="My contacts" />} />
      <Route path="/new-stub" element={<StubPage title="New" />} />
      <Route path="/account-stub" element={<StubPage title="My account and settings" />} />
      
      {/* Legal Routes */}
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/cookies" element={<CookiesPolicy />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      
      {/* Auth Routes */}
      <Route path="/connect" element={<ConnectPage />} />
      
      {/* Protected App Routes */}
      <Route
        path="/app/*"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
