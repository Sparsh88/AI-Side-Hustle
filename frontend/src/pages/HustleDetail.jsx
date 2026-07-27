import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket, Wrench, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Loader from '../components/Loader';
import { API_BASE_URL } from '../config';

const HustleDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hustle } = location.state || {};

  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const hustleId = hustle ? encodeURIComponent(hustle.title.toLowerCase().replace(/ /g, '-')) : '';
  const [completedSteps, setCompletedSteps] = useState(() => {
    return JSON.parse(localStorage.getItem(`progress_${hustleId}`) || '[]');
  });

  const toggleStep = (stepIndex) => {
    setCompletedSteps(prev => {
      const newCompleted = prev.includes(stepIndex) 
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex];
      
      localStorage.setItem(`progress_${hustleId}`, JSON.stringify(newCompleted));
      window.dispatchEvent(new Event('storage'));
      return newCompleted;
    });
  };

  useEffect(() => {
    if (!hustle) {
      navigate('/');
      return;
    }

    const fetchDetails = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/get-hustle-details`, {
          title: hustle.title,
          description: hustle.description
        });
        const fetchedDetails = response.data.details;
        setDetails(fetchedDetails);
        
        if (fetchedDetails && fetchedDetails.steps) {
          localStorage.setItem(`totalSteps_${hustleId}`, fetchedDetails.steps.length);
          window.dispatchEvent(new Event('storage'));
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load the detailed roadmap. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [hustle, navigate, hustleId]);

  if (!hustle) return null;

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      
      {/* Navigation Back */}
      <motion.button 
        whileHover={{ x: -4 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group font-medium"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Results
      </motion.button>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8 md:p-12 rounded-3xl mb-12 relative overflow-hidden border border-white/15"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/15 blur-[120px] rounded-full pointer-events-none" />
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 relative z-10">{hustle.title}</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl relative z-10 leading-relaxed">{hustle.description}</p>
        
        <div className="bg-surface/80 border border-white/10 p-5 rounded-2xl inline-block relative z-10 shadow-lg">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-bold block mb-1">Why it matches you</span>
          <p className="text-primary-300 font-medium italic">"{hustle.matchReason}"</p>
        </div>
      </motion.div>

      {/* Main Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader />
          <p className="text-gray-400 mt-6 animate-pulse font-medium">Generating your personalized action plan...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center text-red-400 flex flex-col items-center gap-4 backdrop-blur-md">
          <AlertCircle className="w-10 h-10" />
          <p className="text-lg font-medium">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-2 px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-300 transition-colors font-semibold">Try Again</button>
        </div>
      ) : details && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Steps */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-6">
              <Rocket className="w-8 h-8 text-primary-400" />
              Your Action Plan
            </h2>
            
            <div className="space-y-6">
              {details.steps.map((step, index) => {
                const isCompleted = completedSteps.includes(index);
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ x: 6, scale: 1.01 }}
                    className={`glass-panel p-6 rounded-3xl relative transition-all duration-300 cursor-pointer border ${
                      isCompleted ? 'border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'hover:border-primary-500/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]'
                    }`}
                    onClick={() => toggleStep(index)}
                  >
                    <div className={`absolute -left-3.5 top-6 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all duration-300 ${
                      isCompleted ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)] scale-110' : 'bg-primary-600 shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-4 h-4 text-white" /> : index + 1}
                    </div>
                    
                    <div className="ml-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-xl font-bold transition-colors ${isCompleted ? 'text-emerald-400 line-through opacity-80' : 'text-white'}`}>
                          {step.title}
                        </h3>
                        <motion.div 
                          whileTap={{ scale: 0.8 }}
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                            isCompleted ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'border-gray-500'
                          }`}
                        >
                          {isCompleted && <CheckCircle className="w-4 h-4 text-white" />}
                        </motion.div>
                      </div>
                      <p className={`text-gray-300 leading-relaxed text-sm sm:text-base transition-opacity ${isCompleted ? 'opacity-60' : ''}`}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Timeline Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="glass-panel p-6 rounded-3xl border border-white/10"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                <Clock className="w-5 h-5 text-blue-400" />
                Expected Timeline
              </h3>
              <p className="text-gray-300 font-semibold text-lg">{details.timeline}</p>
            </motion.div>

            {/* Recommended Tools */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-panel p-6 rounded-3xl border border-white/10"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                <Wrench className="w-5 h-5 text-amber-400" />
                Required Tools
              </h3>
              <ul className="space-y-4">
                {details.tools.map((tool, idx) => (
                  <motion.li 
                    key={idx}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 text-gray-300 text-sm"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white font-semibold">{tool.name}</strong>: {tool.purpose}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
          </div>

        </div>
      )}

    </div>
  );
};

export default HustleDetail;
