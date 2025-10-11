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
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log('Attempting registration with:', { name, email, role }); // Don't log password

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, role }),
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Registration successful! You can now login.");
        navigate('/login');
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert("Connection error. Please try again later.");
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
              CareerFinder
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
          <p className="text-foreground/70">Start your journey to your dream career</p>
        </div>

        <motion.div
          variants={fadeInUp}
          className="card backdrop-blur-xl bg-card/40 border border-secondary/10 p-8"
        >
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
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full pl-10"
                  placeholder="••••••••"
                />
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="button-primary w-full py-3 shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              Create Account
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
