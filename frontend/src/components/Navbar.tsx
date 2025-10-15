import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Briefcase, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const links = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/job-guidance', label: 'Jobs' },
    { path: '/study-materials', label: 'Resources' },
    { path: '/vacancy-tracker', label: 'Vacancies' },
    { path: '/mentor-connect', label: 'Mentors' },
    { path: '/ai-success-predictor', label: 'AI Predictor' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="backdrop-blur-md bg-background/80 sticky top-0 z-50 border-b border-secondary/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 animate-fade">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">Career GPS</span>
          </Link>

          <div className="hidden md:flex space-x-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.path)
                  ? 'bg-primary/20 text-primary shadow-lg shadow-primary/20'
                  : 'text-foreground/80 hover:text-primary hover:bg-primary/10'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="button-secondary hover:bg-secondary/80 text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="button-primary"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="button-secondary hover:bg-secondary/80 text-sm flex items-center gap-2"
              >
                Logout <LogOut size={16} />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-primary/10"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-md bg-background/95 border-t border-secondary/20"
          >
            <div className="px-4 py-3 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.path)
                    ? 'bg-primary/20 text-primary shadow-lg shadow-primary/20'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/10'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="button-secondary block w-full text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="button-primary block w-full text-center"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="button-secondary w-full flex items-center justify-center gap-2"
                >
                  Logout <LogOut size={16} />
                </button>
              )}
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="button-primary block w-full text-center"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
