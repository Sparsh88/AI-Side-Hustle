import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee } from 'lucide-react';
import HustleForm from '../components/HustleForm';
import HustleCard from '../components/HustleCard';
import Loader from '../components/Loader';
import { API_BASE_URL } from '../config';

function Discover() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const fetchHustles = async (formData) => {
    setIsLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/get-hustles`, formData);
      setResults(response.data.suggestions);
    } catch (err) {
      console.error(err);
      setError('Oops! Something went wrong while fetching your side hustles. Make sure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-surface/80 border border-white/10 mb-6 backdrop-blur-md cursor-pointer"
        >
          <IndianRupee className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-semibold text-gray-200">AI-Powered Discovery</span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          Find Your Perfect
          <br />
          <span className="text-gradient">Side Hustle</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed"
        >
          Tell us about your skills, interests, and availability. Our AI will instantly generate personalized, actionable opportunities just for you.
        </motion.p>
      </div>

      {/* Input Form */}
      <HustleForm onSubmit={fetchHustles} isLoading={isLoading} />

      {/* Error Handling */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center text-red-400 max-w-2xl mx-auto backdrop-blur-md font-medium"
        >
          {error}
        </motion.div>
      )}

      {/* Loading State & Results */}
      <div className="mt-16 max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Loader />
            </motion.div>
          )}

          {!isLoading && results.length > 0 && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
                <span className="bg-primary-500/20 text-primary-300 py-1.5 px-4 rounded-full text-sm font-bold border border-primary-500/30">
                  ✨ {results.length} Matches Found
                </span>
              </h2>
              
              {results.map((hustle, idx) => (
                <HustleCard 
                  key={idx}
                  index={idx}
                  title={hustle.title}
                  description={hustle.description}
                  matchReason={hustle.matchReason}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default Discover;
