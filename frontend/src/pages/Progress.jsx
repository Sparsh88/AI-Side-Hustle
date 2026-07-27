import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Progress = () => {
  const [trackedHustles, setTrackedHustles] = useState([]);

  useEffect(() => {
    const loadProgress = () => {
      const saved = JSON.parse(localStorage.getItem('savedHustles') || '[]');
      
      const tracked = saved.map(hustle => {
        const completedSteps = JSON.parse(localStorage.getItem(`progress_${hustle.id}`) || '[]');
        const totalSteps = parseInt(localStorage.getItem(`totalSteps_${hustle.id}`), 10);
        const total = !isNaN(totalSteps) && totalSteps > 0 ? totalSteps : 4;
        
        return {
          ...hustle,
          completedCount: completedSteps.length,
          totalCount: total,
          progressPercent: Math.round((completedSteps.length / total) * 100)
        };
      });
      
      setTrackedHustles(tracked);
    };

    loadProgress();
    window.addEventListener('storage', loadProgress);
    return () => window.removeEventListener('storage', loadProgress);
  }, []);

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 flex items-center justify-center gap-3">
          <div className="bg-primary-500/20 p-3 rounded-2xl border border-primary-500/30">
            <Rocket className="w-8 h-8 text-primary-400" />
          </div>
          Your Progress
        </h1>
        <p className="text-xl text-gray-400 max-w-xl mx-auto">Keep track of your active side hustles and complete your roadmaps.</p>
      </motion.div>

      {trackedHustles.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 rounded-3xl text-center flex flex-col items-center border border-white/10"
        >
          <Target className="w-16 h-16 text-gray-500 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-3">No active roadmaps</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Save a side hustle and start completing its roadmap to see your progress here.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/discover"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-bold transition-all shadow-[0_0_25px_rgba(139,92,246,0.4)]"
            >
              Find a Hustle <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {trackedHustles.map((hustle, idx) => (
            <motion.div 
              key={hustle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="glass-panel p-7 rounded-3xl flex flex-col md:flex-row items-center gap-6 group hover:border-primary-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors">{hustle.title}</h3>
                  <div className="flex items-center gap-2 bg-primary-500/20 px-3.5 py-1 rounded-full border border-primary-500/30 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-bold text-primary-300">{hustle.progressPercent}% Complete</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm line-clamp-2 mb-4 leading-relaxed">{hustle.description}</p>
                
                {/* Animated Progress Bar */}
                <div className="w-full bg-white/5 rounded-full h-3.5 overflow-hidden relative border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${hustle.progressPercent}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-400 font-medium">{hustle.completedCount} of {hustle.totalCount} tasks completed</span>
                </div>
              </div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full md:w-auto">
                <Link 
                  to={`/hustle/${hustle.id}`}
                  state={{ hustle }}
                  className="w-full md:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-2xl transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 font-semibold shadow-lg"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Progress;
