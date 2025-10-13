import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PredictionChart from '../components/PredictionChart';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';
import axios from 'axios';

export default function AISuccessPredictor() {

  const [formData, setFormData] = useState({
    skills: '',
    education: '',
    experience: '',
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [skillMap, setSkillMap] = useState<{ [key: string]: number }>({});

  // Fetch skill-to-index mapping on mount
  useEffect(() => {
    axios.get('http://localhost:5003/api/skills')
      .then(res => {
        const map: { [key: string]: number } = {};
        if (res.data && res.data.skills) {
          res.data.skills.forEach((item: { skill: string, index: number }) => {
            map[item.skill.trim().toLowerCase()] = item.index;
          });
        }
        setSkillMap(map);
      })
      .catch(() => setSkillMap({}));
  }, []);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Map education to an integer (customize as per your model)
    let degreeLevel = 0;
    if (formData.education === 'Bachelors') degreeLevel = 1;
    else if (formData.education === 'Masters') degreeLevel = 2;
    else if (formData.education === 'PhD') degreeLevel = 3;

    // Map entered skills to indices using skillMap
    const enteredSkills = formData.skills
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(s => s.length > 0);
    const skill_indices = enteredSkills
      .map(skill => skillMap[skill])
      .filter(idx => typeof idx === 'number');

    const payload = {
      skill_indices,
      years_experience: Number(formData.experience),
      highest_degree_level: degreeLevel,
    };

    try {
      const response = await axios.post('http://localhost:5003/api/predict_success', payload);
      setPrediction(Math.round(response.data.success_rate * 100)); // Convert 0-1 float to percentage
    } catch (error) {
      alert('Prediction failed. Please try again.');
      setPrediction(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-background via-background/95 to-background/90">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4 backdrop-blur-xl">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">AI Success Predictor</h1>
            <p className="text-foreground/70">Get personalized predictions for your career success</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="card backdrop-blur-xl bg-card/40 border border-secondary/10 p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Your Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-foreground mb-2">
                    Skills (comma-separated)
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    required
                    value={formData.skills}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-background/50 border border-secondary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-foreground/50"
                    placeholder="React, TypeScript, Node.js, Python"
                  />
                </div>

                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-foreground mb-2">
                    Education Level
                  </label>
                  <select
                    id="education"
                    name="education"
                    required
                    value={formData.education}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background/50 border border-secondary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  >
                    <option value="">Select your education</option>
                    <option value="Bachelors">Bachelor's Degree</option>
                    <option value="Masters">Master's Degree</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    required
                    min="0"
                    max="50"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background/50 border border-secondary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-foreground/50"
                    placeholder="5"
                  />
                </div>



                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-primary/90 backdrop-blur-xl text-white py-3 rounded-lg font-semibold hover:bg-primary transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Predict My Success
                </motion.button>
              </form>
            </motion.div>

            <motion.div variants={fadeInUp}>
              {prediction === null ? (
                <div className="card backdrop-blur-xl bg-card/40 border border-secondary/10 p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="h-24 w-24 text-foreground/20 mx-auto mb-4" />
                    <p className="text-foreground/70 text-lg">
                      Fill out the form to see your career success prediction
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-900 rounded-xl shadow-md p-8 border-2 border-primary">
                  <h2 className="text-3xl font-extrabold text-white mb-6 text-center drop-shadow-lg">
                    Your Success Score
                  </h2>
                  <PredictionChart percentage={prediction} />
                  <div className="mt-8 space-y-4">
                    <div className="bg-primary/90 rounded-lg p-4">
                      <p className="text-xl font-bold text-white mb-2">
                        {prediction >= 80
                          ? "You're excellently prepared for your dream role!"
                          : prediction >= 60
                          ? "You're on the right track, keep building your skills!"
                          : "There's room for growth - focus on expanding your expertise!"}
                      </p>
                      <p className="text-base text-white/90">
                        {prediction >= 80
                          ? "Your combination of skills, education, and experience positions you as a strong candidate. Consider applying to senior roles."
                          : prediction >= 60
                          ? "Continue developing your skill set and working on impactful projects to boost your readiness score."
                          : "Focus on gaining more practical experience, building projects, and expanding your technical skills."}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-sm text-primary mb-1">Next Steps</p>
                        <p className="font-semibold text-white">Connect with Mentors</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-sm text-primary mb-1">Recommended</p>
                        <p className="font-semibold text-white">Skill Development</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}