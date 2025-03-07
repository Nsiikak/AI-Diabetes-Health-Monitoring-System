
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/utils/auth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp";
import ChatBot from "./pages/ChatBot";
import Predictions from "./pages/Predictions";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={
            // <ProtectedRoute>
              <Index />
            // </ProtectedRoute>
          } />
          <Route path="/reports" element={
            // <ProtectedRoute>
              <Reports />
            // </ProtectedRoute>
          } />
          <Route path="/settings" element={
            // <ProtectedRoute>
               <Settings />
            // </ProtectedRoute>
          } />
          <Route path="/chatbot" element={
            // <ProtectedRoute>
              <ChatBot />
            // </ProtectedRoute>
          } />
           <Route path="/predictions" element={
            // <ProtectedRoute>
              <Predictions />
            // </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
