import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Home,
  BarChart2,
  Settings,
  MenuIcon,
  X,
  LogOut,
  MessageCircle,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/utils/auth";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  const closeMobileMenu = () => setMobileMenuOpen(false);
  
  const navItems = [
    { to: "/", icon: <Home className="h-5 w-5" />, label: "Home" },
    { to: "/chatbot", icon: <MessageCircle className="h-5 w-5" />, label: "Chat Assistant" },
    { to: "/predictions", icon: <TrendingUp className="h-5 w-5" />, label: "Predictions" },
    { to: "/reports", icon: <BarChart2 className="h-5 w-5" />, label: "Reports" },
    { to: "/settings", icon: <Settings className="h-5 w-5" />, label: "Settings" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">DiabetesTracker</span>
            </NavLink>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to}
                onClick={closeMobileMenu}
                className={({ isActive }) => cn(
                  "px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2",
                  isActive 
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-primary/5 hover:text-foreground"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-4"
              onClick={() => {
                logout();
                closeMobileMenu();
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden px-4 pb-4 bg-background"
        >
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMobileMenu}
                className={({ isActive }) => cn(
                  "px-3 py-3 rounded-md text-base font-medium flex items-center space-x-2",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-primary/5 hover:text-foreground"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => {
                logout();
                closeMobileMenu();
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
