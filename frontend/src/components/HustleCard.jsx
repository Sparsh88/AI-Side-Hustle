import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const HustleCard = ({ title, description, matchReason, index }) => {
  const hustleId = encodeURIComponent(title.toLowerCase().replace(/ /g, '-'));
  
  const [isSaved, setIsSaved] = React.useState(() => {
    const savedHustles = JSON.parse(localStorage.getItem('savedHustles') || '[]');
    return savedHustles.some(h => h.id === hustleId);
  });

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const savedHustles = JSON.parse(localStorage.getItem('savedHustles') || '[]');
    
    if (isSaved) {
      const updated = savedHustles.filter(h => h.id !== hustleId);
      localStorage.setItem('savedHustles', JSON.stringify(updated));
      setIsSaved(false);
    } else {
      const newHustle = { id: hustleId, title, description, matchReason, savedAt: new Date().toISOString() };
      localStorage.setItem('savedHustles', JSON.stringify([...savedHustles, newHustle]));
      setIsSaved(true);
    }
    
    // Dispatch a custom event so other components (like Dashboard) can listen if needed
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <Link 
        to={`/hustle/${hustleId}`}
        state={{ hustle: { title, description, matchReason } }}
        className="block glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-primary-500/50 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-400 to-purple-600 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
        
        <div className="flex items-start gap-4">
          <div className="bg-primary-500/10 p-3 rounded-xl border border-primary-500/20 group-hover:bg-primary-500/20 transition-colors">
            <Briefcase className="w-6 h-6 text-primary-400" />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{title}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className={`p-2 rounded-full transition-colors ${
                    isSaved 
                      ? 'bg-primary-500/20 text-primary-400' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                  aria-label={isSaved ? "Unsave hustle" : "Save hustle"}
                >
                  {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                </button>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-primary-400 transform group-hover:translate-x-1 transition-all" />
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">{description}</p>
            
            <div className="bg-surface/80 rounded-xl p-4 border border-white/5 group-hover:border-primary-500/20 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold text-gray-200">Why it's a match</span>
              </div>
              <p className="text-sm text-gray-400 italic">"{matchReason}"</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default HustleCard;
