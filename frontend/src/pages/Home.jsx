import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, BrainCircuit, Target, Users, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <ChevronDown className={`w-5 h-5 text-primary-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  return (
    <div className="relative z-10 w-full overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/40 via-background to-background z-0" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">The #1 AI Side Hustle Platform</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            Turn Your Skills Into <br />
            <span className="text-gradient">Extra Income</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed mb-12"
          >
            Stop guessing what side hustle fits you. Our advanced AI analyzes your unique skills, interests, and schedule to build a personalized roadmap to profitability.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/discover"
              className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2"
            >
              Start Discovering <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center"
            >
              See How It Works
            </a>
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-12 border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Hustles Generated</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Match Accuracy</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">AI Support</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">$0</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">To Get Started</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How HustleFinder Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Three simple steps to launch your next income stream.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary-500/0 via-primary-500/50 to-primary-500/0 z-0" />
            
            <div className="relative z-10 glass-panel p-8 rounded-3xl text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="w-24 h-24 mx-auto bg-primary-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-10 h-10 text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">1. Share Your Skills</h3>
              <p className="text-gray-400">Tell our AI about your interests, available time, and budget. No experience? No problem.</p>
            </div>
            
            <div className="relative z-10 glass-panel p-8 rounded-3xl text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="w-24 h-24 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">2. Get Matched</h3>
              <p className="text-gray-400">Instantly receive a curated list of side hustles mathematically matched to your exact profile.</p>
            </div>
            
            <div className="relative z-10 glass-panel p-8 rounded-3xl text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="w-24 h-24 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">3. Follow the Roadmap</h3>
              <p className="text-gray-400">Save your favorite hustle and follow the step-by-step interactive checklist to start earning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-surface/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Everything you need to succeed.</h2>
              <p className="text-xl text-gray-400 mb-8">We don't just give you an idea. We give you the entire execution plan and the tools to track your progress.</p>
              
              <ul className="space-y-6">
                {[
                  "Hyper-personalized AI matching algorithm",
                  "Step-by-step interactive roadmaps",
                  "Built-in dashboard to track your progress",
                  "24/7 AI Chatbot assistant to answer questions",
                  "Tool recommendations for every hustle"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-1 bg-primary-500/20 p-1 rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-primary-400" />
                    </div>
                    <span className="text-lg text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-purple-500/20 blur-[80px] rounded-full" />
              <div className="glass-panel p-8 rounded-3xl relative z-10 border border-white/10 shadow-2xl">
                {/* Mock UI elements to look like the app */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Freelance Writing</h4>
                    <p className="text-primary-300 text-sm">98% Match</p>
                  </div>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden flex relative mt-4">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-500 ease-out"
                    style={{ width: '45%' }}
                  />
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Progress</span>
                  <span className="text-sm font-bold text-green-400">45% Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        </div>
        <div className="glass-panel p-8 rounded-3xl">
          <FAQItem 
            question="Is HustleFinder really free?" 
            answer="Yes! Generating side hustle ideas, saving them to your dashboard, and tracking your progress is completely free." 
          />
          <FAQItem 
            question="How does the AI matching work?" 
            answer="We use advanced Large Language Models (like GPT-4) to cross-reference your specific skills, interests, budget, and time constraints against thousands of profitable business models to find the perfect overlap." 
          />
          <FAQItem 
            question="What if I don't have any specialized skills?" 
            answer="That's perfectly fine! Our AI is trained to identify low-barrier-to-entry hustles that require zero prior experience. Just be honest about your current level in the Discover form." 
          />
          <FAQItem 
            question="Does the chatbot actually know about my hustle?" 
            answer="Yes, the global chatbot floating in the bottom right corner is context-aware and acts as a dedicated guide for the HustleFinder platform. You can ask it anything if you get stuck!" 
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-900/20 z-0" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to change your financial future?</h2>
          <p className="text-xl text-primary-200 mb-10 max-w-2xl mx-auto">
            Stop waiting for the perfect opportunity. Let our AI build it for you in seconds.
          </p>
          <Link 
            to="/discover"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary-900 rounded-full font-bold text-xl transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Generate My Hustle <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
