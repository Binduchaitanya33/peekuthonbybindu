import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import { jobs } from '../data/jobs';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';

export default function JobGuidance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  const domains = ['All', ...new Set(jobs.map((job) => job.domain))];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === 'All' || job.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-background via-background/95 to-background/90">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Job Guidance</h1>
            <p className="text-foreground/70">Discover career opportunities tailored to your skills</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="card backdrop-blur-xl bg-card/40 border border-secondary/10 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/50" />
                <input
                  type="text"
                  placeholder="Search jobs or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background/50 border border-secondary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-foreground/50"
                />
              </div>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-4 py-3 bg-background/50 border border-secondary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
              >
                {domains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div className="mb-4 text-foreground/70">
              Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg">No jobs found matching your criteria</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
