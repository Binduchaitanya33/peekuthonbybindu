import { Briefcase, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-card/40 backdrop-blur-xl border-t border-secondary/20">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                CareerFinder
              </span>
            </div>
            <p className="text-sm text-foreground/70">
              Your trusted platform for finding the perfect career path and connecting with mentors.
            </p>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/job-guidance" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Job Guidance
                </Link>
              </li>
              <li>
                <Link to="/study-materials" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Study Materials
                </Link>
              </li>
              <li>
                <Link to="/mentor-connect" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Mentor Connect
                </Link>
              </li>
              <li>
                <Link to="/vacancy-tracker" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Vacancy Tracker
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Career Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Interview Prep
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Resume Builder
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm text-foreground/70">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@careerfinder.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-foreground/70">
                <Phone className="h-4 w-4 text-info" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-foreground/70">
                <MapPin className="h-4 w-4 text-success" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary/20 mt-8 pt-8 text-center text-sm text-foreground/60">
          <p>&copy; 2025 CareerFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
