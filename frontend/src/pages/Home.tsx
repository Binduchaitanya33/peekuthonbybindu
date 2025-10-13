import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  BookOpen,
  Users,
  TrendingUp,
  Calendar,
  Brain,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';

export default function Home() {
  const features = [
    {
      icon: Briefcase,
      title: 'Job Guidance',
      description: 'Discover career opportunities tailored to your skills and interests',
      to: '/job-guidance'
    },
    {
      icon: BookOpen,
      title: 'Study Materials',
      description: 'Access curated learning resources recommended by industry experts',
      to: '/study-materials'
    },
    {
      icon: Users,
      title: 'Mentor Connect',
      description: 'Connect with experienced professionals in your field',
      to: '/mentor-connect'
    },
    {
      icon: Calendar,
      title: 'Vacancy Tracker',
      description: 'Stay updated with latest job openings and application deadlines',
      to: '/vacancy-tracker'
    },
    {
      icon: TrendingUp,
      title: 'Career Analytics',
      description: 'Track your progress and get insights on your career journey',
      to: '/dashboard'
    },
    {
      icon: Brain,
      title: 'AI Success Predictor',
      description: 'Get personalized predictions for your career success',
      to: '/ai-success-predictor'
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      text: 'CareerFinder helped me land my dream job at a top tech company. The mentor connections were invaluable!',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Product Manager',
      text: 'The AI predictor gave me insights into what skills I needed to develop. Now I am thriving in my new role.',
    },
    {
      name: 'Emily Thompson',
      role: 'UX Designer',
      text: 'The study materials and job guidance features made my career transition smooth and successful.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <Navbar />

      <section className="container mx-auto py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-bold text-foreground mb-6"
          >
            Find Your Dream Career
            <span className="block bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent mt-2">
              With Expert Guidance
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto"
          >
            Connect with mentors, access premium study materials, and discover opportunities
            that match your skills and aspirations.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="button-primary flex items-center group px-8 py-4 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/job-guidance"
              className="button-secondary px-8 py-4 text-lg"
            >
              Explore Jobs
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="container mx-auto py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center text-foreground mb-12"
          >
            Everything You Need to Succeed
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-gradient-to-r from-primary/20 via-info/20 to-primary/20 backdrop-blur-3xl py-20">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-foreground mb-6"
            >
              Why Choose CareerFinder?
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left"
            >
              {[
                'Personalized job recommendations',
                'Expert mentor connections',
                'AI-powered career insights',
                'Curated learning resources',
                'Real-time vacancy tracking',
                'Success prediction analytics',
              ].map((benefit, index) => (
                <div key={index} className="flex items-center text-foreground">
                  <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 text-success" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center text-foreground mb-12"
          >
            Success Stories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="card backdrop-blur-xl bg-card/40 hover:bg-card/60 border border-secondary/10"
              >
                <p className="text-foreground/80 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-primary">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-gradient-to-r from-primary/30 via-info/30 to-primary/30 backdrop-blur-3xl py-20">
        <div className="container mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Join thousands of professionals who have found their dream jobs with CareerFinder
            </p>
            <Link
              to="/signup"
              className="button-primary inline-flex items-center px-8 py-4 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 group"
            >
              Start Your Journey Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
