import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full blur-xl bg-primary-500/50"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="relative bg-surface p-4 rounded-full border border-white/10 shadow-lg"
        >
          <Sparkles className="w-8 h-8 text-primary-400" />
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-lg font-medium text-primary-100"
      >
        AI is analyzing your profile...
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-2 text-sm text-gray-400"
      >
        Finding the perfect side hustles for you
      </motion.p>
    </div>
  );
};

export default Loader;
