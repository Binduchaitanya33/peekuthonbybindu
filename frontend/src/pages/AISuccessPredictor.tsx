import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PredictionChart from '../components/PredictionChart';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';

export default function AISuccessPredictor() {
  const [formData, setFormData] = useState({
    skills: '',
    education: '',
    experience: '',
  });
  const [prediction, setPrediction] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // The frontend no longer needs the hardcoded skill_indices or the mapping logic.
    // It just needs to send the raw skill string and the other variables.
    const payload = {
      // Send the raw skill string from the textarea
      skills: formData.skills,

      // Total experience in months
      total_experience_months: parseInt(formData.experience || "0") * 12,

      // Map education level to numerical value
      highest_degree_level:
        formData.education === "PhD"
          ? 3
          : formData.education === "Masters"
            ? 2
            : 1, // Assuming Bachelors or other means 1
    };

    try {
      const response = await fetch("http://127.0.0.1:5003/api/predict_success", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data.success_rate);
      } else {
        console.error("Prediction failed:", data);
        alert("Prediction failed: " + data.detail);
      }
    } catch (error) {
      console.error("Error connecting to API:", error);
      alert("Error connecting to backend API.");
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
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
                    Your Success Score
                  </h2>
                  <PredictionChart percentage={prediction} />
                  <div className="mt-8 space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                      <p className="text-lg font-semibold text-text-primary mb-2">
                        {prediction >= 80
                          ? "You're excellently prepared for your dream role!"
                          : prediction >= 60
                            ? "You're on the right track, keep building your skills!"
                            : "There's room for growth - focus on expanding your expertise!"}
                      </p>
                      <p className="text-sm text-gray-700">
                        {prediction >= 80
                          ? "Your combination of skills, education, and experience positions you as a strong candidate. Consider applying to senior roles."
                          : prediction >= 60
                            ? "Continue developing your skill set and working on impactful projects to boost your readiness score."
                            : "Focus on gaining more practical experience, building projects, and expanding your technical skills."}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background-light rounded-lg p-4">
                        <p className="text-sm text-text-secondary mb-1">Next Steps</p>
                        <p className="font-semibold text-text-primary">Connect with Mentors</p>
                      </div>
                      <div className="bg-background-light rounded-lg p-4">
                        <p className="text-sm text-text-secondary mb-1">Recommended</p>
                        <p className="font-semibold text-text-primary">Skill Development</p>
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
