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
      
      // Update overall progress stats if we want to listen to it
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
        
        // Save total steps for progress calculation on Dashboard
        if (fetchedDetails && fetchedDetails.steps) {
          localStorage.setItem(`totalSteps_${hustleId}`, fetchedDetails.steps.length);
          window.dispatchEvent(new Event('storage')); // Trigger update for other tabs/components
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load the detailed roadmap. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [hustle, navigate]);

  if (!hustle) return null;

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      
      {/* Navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Results
      </button>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 rounded-3xl mb-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-[100px] rounded-full" />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">{hustle.title}</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl relative z-10">{hustle.description}</p>
        
        <div className="bg-surface/50 border border-white/5 p-4 rounded-xl inline-block relative z-10">
          <span className="text-sm text-gray-400 uppercase tracking-wider font-semibold block mb-1">Why it matches you</span>
          <p className="text-primary-300 font-medium">"{hustle.matchReason}"</p>
        </div>
      </motion.div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader />
          <p className="text-gray-400 mt-6 animate-pulse">Generating your personalized action plan...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center text-red-400 flex flex-col items-center gap-3">
          <AlertCircle className="w-8 h-8" />
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300 transition-colors">Try Again</button>
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
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-panel p-6 rounded-2xl relative transition-all cursor-pointer ${
                      isCompleted ? 'border-green-500/30 bg-green-500/5' : 'hover:border-primary-500/30'
                    }`}
                    onClick={() => toggleStep(index)}
                  >
                    <div className={`absolute -left-3 top-6 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors ${
                      isCompleted ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-primary-600 shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-xl font-semibold transition-colors ${isCompleted ? 'text-green-400 line-through opacity-70' : 'text-white'}`}>
                          {step.title}
                        </h3>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-500'
                        }`}>
                          {isCompleted && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      <p className={`text-gray-400 leading-relaxed transition-opacity ${isCompleted ? 'opacity-50' : ''}`}>
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
            
            {/* Timeline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                <Clock className="w-5 h-5 text-blue-400" />
                Expected Timeline
              </h3>
              <p className="text-gray-300 font-medium">{details.timeline}</p>
            </motion.div>

            {/* Recommended Tools */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel p-6 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                <Wrench className="w-5 h-5 text-orange-400" />
                Required Tools
              </h3>
              <ul className="space-y-3">
                {details.tools.map((tool, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">{tool.name}</strong>: {tool.purpose}</span>
                  </li>
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
