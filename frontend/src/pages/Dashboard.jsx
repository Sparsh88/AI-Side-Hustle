import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Compass, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HustleCard from '../components/HustleCard';
import AnimatedCounter from '../components/AnimatedCounter';

const Dashboard = () => {
  const [savedHustles, setSavedHustles] = useState([]);
  const [stats, setStats] = useState({ activeProjects: 0, overallProgress: 0 });

  useEffect(() => {
    const loadHustles = () => {
      const hustles = JSON.parse(localStorage.getItem('savedHustles') || '[]');
      setSavedHustles(hustles);

      let activeCount = 0;
      let totalCompleted = 0;
      let totalPossible = 0;

      hustles.forEach(hustle => {
        const completed = JSON.parse(localStorage.getItem(`progress_${hustle.id}`) || '[]');
        const total = parseInt(localStorage.getItem(`totalSteps_${hustle.id}`), 10);
        
        if (completed.length > 0) activeCount++;
        
        if (!isNaN(total) && total > 0) {
          totalCompleted += completed.length;
          totalPossible += total;
        }
      });

      const progressPercent = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;
      
      setStats({
        activeProjects: activeCount,
        overallProgress: progressPercent
      });
    };

    loadHustles();
    window.addEventListener('storage', loadHustles);
    return () => window.removeEventListener('storage', loadHustles);
  }, []);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2 flex items-center gap-3">
            <div className="bg-primary-500/20 p-2.5 rounded-2xl border border-primary-500/30">
              <LayoutDashboard className="w-8 h-8 text-primary-400" />
            </div>
            Your Dashboard
          </h1>
          <p className="text-gray-400 text-lg">Track and manage your side hustle journey.</p>
        </div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link 
            to="/discover"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/15 text-white rounded-2xl transition-all shadow-lg backdrop-blur-md"
          >
            <Compass className="w-5 h-5 text-primary-400" />
            Find More Hustles
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Saved Hustles', target: savedHustles.length, color: 'border-t-primary-500' },
          { label: 'Active Projects', target: stats.activeProjects, color: 'border-t-purple-500', sub: stats.activeProjects > 0 ? "Keep up the momentum!" : "Start a checklist to track." },
          { label: 'Overall Progress', target: stats.overallProgress, suffix: '%', color: 'border-t-emerald-500' }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`glass-panel p-6 rounded-3xl border-t-4 ${item.color} shadow-xl hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] transition-all`}
          >
            <h3 className="text-gray-400 font-semibold mb-1 text-sm uppercase tracking-wider">{item.label}</h3>
            <p className="text-4xl font-extrabold text-white">
              <AnimatedCounter target={item.target} suffix={item.suffix || ''} />
            </p>
            {item.sub && <p className="text-xs text-gray-400 mt-2 font-medium">{item.sub}</p>}
          </motion.div>
        ))}
      </div>

      {/* Saved Hustles List */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-primary-400" />
          Saved Hustles
        </h2>
        
        {savedHustles.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-12 rounded-3xl text-center flex flex-col items-center border border-white/10"
          >
            <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mb-6 border border-primary-500/20">
              <Compass className="w-10 h-10 text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No hustles saved yet</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start your journey by discovering AI-personalized side hustles based on your unique skills and interests.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/discover"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-bold transition-all shadow-[0_0_25px_rgba(139,92,246,0.4)]"
              >
                Discover Hustles <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {savedHustles.map((hustle, idx) => (
              <HustleCard 
                key={hustle.id}
                index={idx}
                title={hustle.title}
                description={hustle.description}
                matchReason={hustle.matchReason}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
