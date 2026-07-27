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
    
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
    >
      <Link 
        to={`/hustle/${hustleId}`}
        state={{ hustle: { title, description, matchReason } }}
        className="block glass-panel glass-panel-hover p-6 rounded-3xl relative overflow-hidden group transition-all duration-300 cursor-pointer"
      >
        {/* Animated Left Glow Stripe */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary-400 via-purple-500 to-pink-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-out" />
        
        {/* Subtle Background Glow on Hover */}
        <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex items-start gap-4 relative z-10">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="bg-primary-500/10 p-3.5 rounded-2xl border border-primary-500/20 group-hover:bg-primary-500/25 group-hover:border-primary-400/40 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 shrink-0"
          >
            <Briefcase className="w-6 h-6 text-primary-400 group-hover:text-primary-300 transition-colors" />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300 truncate">
                {title}
              </h3>
              
              <div className="flex items-center gap-2 shrink-0">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={handleSave}
                  className={`p-2.5 rounded-full transition-all duration-300 ${
                    isSaved 
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                  aria-label={isSaved ? "Unsave hustle" : "Save hustle"}
                >
                  {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                </motion.button>
                
                <motion.div
                  className="p-2 text-gray-500 group-hover:text-primary-400 transition-colors"
                >
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </motion.div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base line-clamp-2">
              {description}
            </p>
            
            <div className="bg-surface/80 rounded-2xl p-4 border border-white/5 group-hover:border-primary-500/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Why it's a match</span>
              </div>
              <p className="text-sm text-gray-300/90 italic">"{matchReason}"</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default HustleCard;
