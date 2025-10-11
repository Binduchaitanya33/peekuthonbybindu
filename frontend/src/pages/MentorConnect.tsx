import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MentorCard from '../components/MentorCard';
import { mentors } from '../data/mentors';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';

export default function MentorConnect() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All');

  const expertiseAreas = ['All', ...new Set(mentors.map((mentor) => mentor.expertise))];

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = selectedExpertise === 'All' || mentor.expertise === selectedExpertise;
    return matchesSearch && matchesExpertise;
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
            <h1 className="text-4xl font-bold text-foreground mb-2">Mentor Connect</h1>
            <p className="text-foreground/70">Connect with experienced professionals in your field</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="card backdrop-blur-xl bg-card/40 border border-secondary/10 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/50" />
                <input
                  type="text"
                  placeholder="Search mentors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background/50 border border-secondary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-foreground/50"
                />
              </div>
              <select
                value={selectedExpertise}
                onChange={(e) => setSelectedExpertise(e.target.value)}
                className="px-4 py-3 bg-background/50 border border-secondary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
              >
                {expertiseAreas.map((expertise) => (
                  <option key={expertise} value={expertise}>
                    {expertise}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div className="mb-4 text-foreground/70">
              Showing {filteredMentors.length} {filteredMentors.length === 1 ? 'mentor' : 'mentors'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
            {filteredMentors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg">No mentors found matching your criteria</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
