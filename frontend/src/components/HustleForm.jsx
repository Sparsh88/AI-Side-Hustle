import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, IndianRupee, Code, Heart } from 'lucide-react';

const HustleForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    skills: '',
    interests: '',
    time: '1-2 hrs',
    budget: 'low'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.skills.trim() || !formData.interests.trim()) {
      setError('Please fill in both your skills and interests.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-panel p-8 md:p-10 rounded-3xl w-full max-w-2xl mx-auto border border-white/15 shadow-2xl relative overflow-hidden"
      onSubmit={handleSubmit}
    >
      <div className="space-y-6 relative z-10">
        
        {/* Skills & Interests Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div whileHover={{ y: -2 }} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
              <Code className="w-4 h-4 text-primary-400" />
              Your Skills
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. writing, coding, design"
              className="w-full bg-surface/80 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/40 transition-all duration-300 shadow-inner"
            />
          </motion.div>

          <motion.div whileHover={{ y: -2 }} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
              <Heart className="w-4 h-4 text-pink-400" />
              Your Interests
            </label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="e.g. fitness, gaming, art"
              className="w-full bg-surface/80 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/40 transition-all duration-300 shadow-inner"
            />
          </motion.div>
        </div>

        {/* Time & Budget Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div whileHover={{ y: -2 }} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
              <Clock className="w-4 h-4 text-blue-400" />
              Available Time (Weekly)
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full bg-surface/80 border border-white/10 rounded-2xl px-4 py-3.5 text-white appearance-none focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/40 transition-all duration-300 shadow-inner"
            >
              <option value="1-2 hrs">1-2 hours</option>
              <option value="3-4 hrs">3-4 hours</option>
              <option value="5-10 hrs">5-10 hours</option>
              <option value="full-time">Full-time</option>
            </select>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
              <IndianRupee className="w-4 h-4 text-emerald-400" />
              Startup Budget
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full bg-surface/80 border border-white/10 rounded-2xl px-4 py-3.5 text-white appearance-none focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/40 transition-all duration-300 shadow-inner"
            >
              <option value="zero">₹0 (Zero)</option>
              <option value="low">Low (&lt;₹5,000)</option>
              <option value="medium">Medium (₹5,000 - ₹20,000)</option>
              <option value="high">High (₹20,000+)</option>
            </select>
          </motion.div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 py-2.5 rounded-xl font-medium"
          >
            {error}
          </motion.p>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] transition-all duration-300"
        >
          <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-700 ease-out skew-x-12" />
          <div className="relative flex items-center justify-center gap-2 py-4">
            {isLoading ? (
              <span className="text-white font-bold tracking-wide animate-pulse">Generating Magic...</span>
            ) : (
              <>
                <Search className="w-5 h-5 text-white" />
                <span className="text-white font-extrabold text-lg tracking-wide">Find My Side Hustle</span>
              </>
            )}
          </div>
        </motion.button>
      </div>
    </motion.form>
  );
};

export default HustleForm;
