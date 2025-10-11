import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VacancyTable from '../components/VacancyTable';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';
import API_BASE_URL from '../config';

import { Vacancy } from '../data/vacancies';

export default function VacancyTracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  const statuses = ['All', 'Ongoing', 'Closed', 'Upcoming'];

  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to view vacancies!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch vacancies');

      const data: Vacancy[] = await response.json();
      setVacancies(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching vacancies. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredVacancies = vacancies.filter((vacancy) => {
    const matchesSearch =
      vacancy.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || vacancy.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-background via-background/95 to-background/90">
      <Navbar />

      <div className="container mx-auto py-12">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Vacancy Tracker</h1>
            <p className="text-foreground/70">Stay updated with latest job openings and deadlines</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="card backdrop-blur-xl bg-card/40 border border-secondary/10 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <input
                  type="text"
                  placeholder="Search companies or positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input w-full pl-10"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input bg-input text-foreground min-w-[120px]"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            {loading ? (
              <p className="text-center py-12 text-foreground/70">Loading vacancies...</p>
            ) : filteredVacancies.length > 0 ? (
              <VacancyTable vacancies={filteredVacancies} />
            ) : (
              <div className="text-center py-12 card backdrop-blur-xl bg-card/40 border border-secondary/10">
                <p className="text-foreground/70 text-lg">No vacancies found matching your criteria</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
