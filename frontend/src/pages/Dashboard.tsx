import { motion } from 'framer-motion';
import { Briefcase, BookmarkCheck, Users, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import { jobs } from '../data/jobs';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';

export default function Dashboard() {
  const stats = [
    { icon: Briefcase, label: 'Saved Jobs', value: '12', color: 'bg-primary/20 text-primary' },
    { icon: BookmarkCheck, label: 'Applied', value: '8', color: 'bg-success/20 text-success' },
    { icon: Users, label: 'Mentors', value: '3', color: 'bg-info/20 text-info' },
    { icon: TrendingUp, label: 'Profile Views', value: '45', color: 'bg-warning/20 text-warning' },
  ];

  const recommendedJobs = jobs.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-r from-background via-background/95 to-background/90">
      <Navbar />

      <div className="container mx-auto py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back!</h1>
            <p className="text-foreground/70">Here's what's happening with your career journey</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                className="card backdrop-blur-xl bg-card/40 border border-secondary/10"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Recommended For You</h2>
              <a href="/job-guidance" className="text-primary hover:opacity-80 font-medium group inline-flex items-center">
                View All
                <TrendingUp className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.a
                href="/ai-success-predictor"
                whileHover={{ y: -8 }}
                className="card backdrop-blur-xl bg-gradient-to-r from-primary/20 to-info/20 border border-primary/20 shadow-lg shadow-primary/10 hover:shadow-primary/20 group"
              >
                <h3 className="text-xl font-semibold mb-2 text-foreground">Check Your Readiness</h3>
                <p className="text-foreground/70">Use our AI predictor to assess your career readiness</p>
              </motion.a>

              <motion.a
                href="/mentor-connect"
                whileHover={{ y: -8 }}
                className="card backdrop-blur-xl bg-gradient-to-r from-info/20 to-success/20 border border-info/20 shadow-lg shadow-info/10 hover:shadow-info/20 group"
              >
                <h3 className="text-xl font-semibold mb-2 text-foreground">Find a Mentor</h3>
                <p className="text-foreground/70">Connect with industry experts for guidance</p>
              </motion.a>

              <motion.a
                href="/study-materials"
                whileHover={{ y: -8 }}
                className="card backdrop-blur-xl bg-gradient-to-r from-warning/20 to-success/20 border border-warning/20 shadow-lg shadow-warning/10 hover:shadow-warning/20 group"
              >
                <h3 className="text-xl font-semibold mb-2 text-foreground">Learn New Skills</h3>
                <p className="text-foreground/70">Access curated study materials and courses</p>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
