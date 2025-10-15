import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Mail, Lock, User } from 'lucide-react';
import { fadeInUp } from '../animations/motionVariants';
import API_BASE_URL from "../config";

interface SignupResponse {
  token: string;
  message: string;
  user: { id: string; name: string; email: string };
}

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Basic validation
      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        setLoading(false);
        return;
      }

      if (!email.includes('@')) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      console.log('Attempting registration with:', { name, email, role });

      // First, check if the server is reachable
      try {
        const healthCheck = await fetch(`${API_BASE_URL}/health`);
        if (!healthCheck.ok) {
          throw new Error('Server is not responding');
        }
      } catch (error) {
        console.error('Server health check failed:', error);
        setError('Server is not available. Please try again in a few minutes.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": window.location.origin
        },
        mode: 'cors',
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (response.ok) {
        // Registration successful
        alert("Registration successful! Please login to continue.");
        navigate('/login');
      } else {
        // Handle different error cases
        if (response.status === 409) {
          setError("This email is already registered. Please try logging in instead.");
        } else if (response.status === 400) {
          setError(data.message || "Please check your input and try again.");
        } else if (response.status === 500) {
          setError("Server error. Please try again in a few minutes.");
        } else {
          setError(data.message || "Registration failed. Please try again.");
        }
        console.error('Registration failed:', response.status, data);
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setError("Cannot reach the server. Please check your internet connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-background via-background/95 to-background/90 flex items-center justify-center px-4 py-12">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <Briefcase className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
              Career GPS
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
          <p className="text-foreground/70">Start your journey to your dream career</p>
        </div>

        <motion.div
          variants={fadeInUp}
          className="card backdrop-blur-xl bg-card/40 border border-secondary/10 p-8"
        >
          {error && (
            <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input w-full pl-10"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                I want to join as
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`relative flex items-center justify-center p-4 rounded-lg cursor-pointer border transition-all ${role === 'student'
                    ? 'border-primary bg-primary/10 backdrop-blur-xl'
                    : 'border-secondary/20 bg-card/40 hover:border-primary/50'
                    }`}
                  onClick={() => setRole('student')}
                >
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={role === 'student'}
                    onChange={(e) => setRole(e.target.value)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <User className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-medium text-foreground">Student</div>
                    <div className="text-sm text-foreground/70">Looking for guidance</div>
                  </div>
                </div>

                <div
                  className={`relative flex items-center justify-center p-4 rounded-lg cursor-pointer border transition-all ${role === 'mentor'
                    ? 'border-primary bg-primary/10 backdrop-blur-xl'
                    : 'border-secondary/20 bg-card/40 hover:border-primary/50'
                    }`}
                  onClick={() => setRole('mentor')}
                >
                  <input
                    type="radio"
                    name="role"
                    value="mentor"
                    checked={role === 'mentor'}
                    onChange={(e) => setRole(e.target.value)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <Briefcase className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-medium text-foreground">Mentor</div>
                    <div className="text-sm text-foreground/70">Ready to guide others</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-primary focus:outline-none"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-primary bg-input border-secondary rounded focus:ring-2 focus:ring-primary mt-1"
              />
              <label className="ml-2 text-sm text-foreground/70">
                I agree to the{' '}
                <a href="#" className="text-primary hover:opacity-80 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:opacity-80 font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className={`button-primary w-full py-3 shadow-lg shadow-primary/20 hover:shadow-primary/40 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-foreground/70">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:opacity-80 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
