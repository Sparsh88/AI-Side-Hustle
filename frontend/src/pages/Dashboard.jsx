import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Compass, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HustleCard from '../components/HustleCard';

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
        
        // Only count towards overall progress if we know the total steps for this hustle
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
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-primary-400" />
            Your Dashboard
          </h1>
          <p className="text-gray-400 text-lg">Track and manage your side hustle journey.</p>
        </div>
        
        <Link 
          to="/discover"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all hover:-translate-y-1"
        >
          <Compass className="w-5 h-5 text-primary-400" />
          Find More Hustles
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-primary-500">
          <h3 className="text-gray-400 font-medium mb-1">Saved Hustles</h3>
          <p className="text-4xl font-bold text-white">{savedHustles.length}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-purple-500">
          <h3 className="text-gray-400 font-medium mb-1">Active Projects</h3>
          <p className="text-4xl font-bold text-white">{stats.activeProjects}</p>
          <p className="text-sm text-gray-500 mt-2">
            {stats.activeProjects > 0 ? "Keep up the great work!" : "Start a checklist to begin tracking."}
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-blue-500">
          <h3 className="text-gray-400 font-medium mb-1">Overall Progress</h3>
          <p className="text-4xl font-bold text-white">{stats.overallProgress}%</p>
        </div>
      </div>

      {/* Saved Hustles List */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-primary-400" />
          Saved Hustles
        </h2>
        
        {savedHustles.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Compass className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">No hustles saved yet</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start your journey by discovering AI-personalized side hustles based on your unique skills and interests.
            </p>
            <Link 
              to="/discover"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-semibold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              Discover Hustles <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
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
