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
        const total = !isNaN(totalSteps) && totalSteps > 0 ? totalSteps : 4; // fallback to 4 if not loaded yet
        
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
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-3">
          <Rocket className="w-10 h-10 text-primary-400" />
          Your Progress
        </h1>
        <p className="text-xl text-gray-400">Keep track of your active side hustles and complete your roadmaps.</p>
      </div>

      {trackedHustles.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center flex flex-col items-center">
          <Target className="w-16 h-16 text-gray-500 mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-3">No active roadmaps</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Save a side hustle and start completing its roadmap to see your progress here.
          </p>
          <Link 
            to="/discover"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-semibold transition-all hover:scale-105"
          >
            Find a Hustle <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {trackedHustles.map((hustle, idx) => (
            <motion.div 
              key={hustle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 group hover:border-primary-500/30 transition-colors"
            >
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{hustle.title}</h3>
                  <div className="flex items-center gap-2 bg-primary-500/20 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-primary-400" />
                    <span className="text-sm font-semibold text-primary-300">{hustle.progressPercent}% Complete</span>
                  </div>
                </div>
                <p className="text-gray-400 line-clamp-2 mb-4">{hustle.description}</p>
                
                {/* Visual Progress Bar */}
                <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden flex relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-500 ease-out"
                    style={{ width: `${hustle.progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">{hustle.completedCount} of {hustle.totalCount} tasks completed</span>
                </div>
              </div>
              
              <Link 
                to={`/hustle/${hustle.id}`}
                state={{ hustle }}
                className="w-full md:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Progress;
