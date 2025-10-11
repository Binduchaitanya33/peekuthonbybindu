import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Mail, Lock } from 'lucide-react';
import { fadeInUp } from '../animations/motionVariants';
import API_BASE_URL from "../config"; // backend URL

interface LoginResponse {
  token: string;
  message: string;
  user: { id: string; name: string; email: string };
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log('Attempting login with:', { email }); // Don't log password

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed. Please check your email and password.");
      }
    } catch (error) {
      console.error('Login error:', error);
      alert("Connection error. Please make sure you're registered and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-background via-background/95 to-background/90 flex items-center justify-center px-4">
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
              CareerFinder
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-foreground/70">Sign in to continue your career journey</p>
        </div>

        <motion.div
          variants={fadeInUp}
          className="card backdrop-blur-xl bg-card/40 border border-secondary/10 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-input border-secondary rounded focus:ring-2 focus:ring-primary"
                />
                <span className="ml-2 text-sm text-foreground/70">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:opacity-80 font-medium">
                Forgot password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="button-primary w-full py-3 shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              Sign In
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-foreground/70">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:opacity-80 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}