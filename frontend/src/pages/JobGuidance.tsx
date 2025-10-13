import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import { jobs as localJobs } from '../data/jobs';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';

export default function JobGuidance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [jobs, setJobs] = useState(localJobs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Derive domains from current jobs list
  const domains = ['All', ...new Set(jobs.map((job) => job.domain))];

  useEffect(() => {
    // Fetch remote jobs on mount
    fetchRemoteJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchRemoteJobs() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://remotive.com/api/remote-jobs');
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const json = await res.json();

      // Map Remotive jobs to our local job shape where possible
      const remoteJobs = (json.jobs || []).slice(0, 50).map((r: any, idx: number) => ({
        id: `remote-${r.id || idx}`,
        title: r.title || 'Untitled',
        company: r.company_name || r.company || 'Unknown',
        location: r.candidate_required_location || r.location || 'Remote',
        domain: r.category || 'General',
        description: r.description || '',
        url: r.url || r.job_apply_link || '#',
        type: r.job_type || r.employment_type || 'Full-time',
        salary: r.salary || 'Not specified',
        requirements: (r.tags || []).length > 0 ? r.tags : ['Not specified'],
      }));

      if (remoteJobs.length > 0) {
        setJobs(remoteJobs);
      } else {
        setError('No remote jobs returned; showing local jobs.');
        setJobs(localJobs);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch remote jobs; showing local jobs.');
      setJobs(localJobs);
    } finally {
      setLoading(false);
    }
  }

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
              <div className="flex items-center gap-3">
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

                <button
                  onClick={() => fetchRemoteJobs()}
                  className="px-4 py-3 bg-primary text-white rounded-lg hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : 'Refresh Jobs'}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div className="mb-4 text-foreground/70">
              {error ? (
                <div className="text-sm text-warning mb-2">{error}</div>
              ) : null}
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
