import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, BrainCircuit, Target, Users, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="border-b border-white/10 last:border-0"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-lg font-medium text-white group-hover:text-primary-300 transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-1.5 rounded-full bg-white/5 group-hover:bg-primary-500/20 transition-colors"
        >
          <ChevronDown className="w-5 h-5 text-primary-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Home = () => {
  return (
    <div className="relative z-10 w-full overflow-x-hidden">
      
      {/* Background Animated Lights */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[40%] right-0 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500/10 border border-primary-500/30 mb-8 backdrop-blur-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-primary-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-sm font-semibold text-primary-300">The #1 AI Side Hustle Discovery Platform</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Turn Your Skills Into <br />
            <span className="text-gradient">Extra Income</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed mb-12"
          >
            Stop guessing what side hustle fits you. Our advanced AI analyzes your unique skills, interests, and schedule to build a personalized roadmap to profitability.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link 
                to="/discover"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.4)] flex items-center justify-center gap-3 group"
              >
                Start Discovering 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <a 
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center backdrop-blur-md"
              >
                See How It Works
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Stats with Scroll Animations */}
      <section className="py-12 border-y border-white/10 bg-black/30 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { target: 50000, suffix: '+', label: 'Hustles Generated' },
              { target: 98, suffix: '%', label: 'Match Accuracy' },
              { target: 24, suffix: '/7', label: 'AI Support' },
              { target: 0, prefix: '$', label: 'To Get Started' },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.08 }}
                className="p-4 rounded-2xl transition-all cursor-default"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-gradient mb-2">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix || ''} prefix={stat.prefix || ''} />
                </div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">How HustleFinder Works</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">Three simple steps to launch your next income stream.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                icon: BrainCircuit,
                iconColor: 'text-primary-400',
                bgGradient: 'from-primary-500/20 to-purple-500/10',
                step: '1. Share Your Profile',
                desc: 'Tell our AI about your skills, interests, available time, and startup budget in seconds.'
              },
              {
                icon: Target,
                iconColor: 'text-purple-400',
                bgGradient: 'from-purple-500/20 to-pink-500/10',
                step: '2. Get Matched',
                desc: 'Instantly receive a curated list of side hustles mathematically tailored to your goals.'
              },
              {
                icon: Zap,
                iconColor: 'text-blue-400',
                bgGradient: 'from-blue-500/20 to-teal-500/10',
                step: '3. Follow the Roadmap',
                desc: 'Follow an interactive checklist with real-world timeline estimates to start earning.'
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-panel glass-panel-hover p-8 rounded-3xl text-center relative overflow-hidden group cursor-pointer"
              >
                <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${card.bgGradient} rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-300`}>
                  <card.icon className={`w-10 h-10 ${card.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-300 transition-colors">{card.step}</h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 bg-surface/30 border-y border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">Everything you need to succeed.</h2>
              <p className="text-lg sm:text-xl text-gray-400 mb-8 leading-relaxed">We don't just give you ideas. We give you the entire execution plan and the tools to track your progress.</p>
              
              <ul className="space-y-5">
                {[
                  "Hyper-personalized AI matching algorithm",
                  "Step-by-step interactive roadmaps",
                  "Built-in dashboard to track your progress",
                  "24/7 AI Assistant to answer questions",
                  "Essential tool recommendations for every hustle"
                ].map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-4 cursor-default"
                  >
                    <div className="mt-1 bg-primary-500/20 p-1.5 rounded-full border border-primary-500/30">
                      <CheckCircle2 className="w-5 h-5 text-primary-400" />
                    </div>
                    <span className="text-lg text-gray-200 font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/30 to-purple-500/30 blur-[100px] rounded-full pointer-events-none" />
              <div className="glass-panel p-8 rounded-3xl relative z-10 border border-white/15 shadow-2xl">
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                  <div className="w-14 h-14 bg-gradient-to-tr from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-7 h-7 text-white animate-bounce" style={{ animationDuration: '3s' }} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Freelance Writing</h4>
                    <p className="text-primary-300 text-sm font-semibold">98% Match Rate</p>
                  </div>
                </div>

                <div className="w-full bg-white/5 rounded-full h-3.5 overflow-hidden relative mb-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '65%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-full"
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Action Plan Progress</span>
                  <span className="font-bold text-emerald-400">65% Completed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">Frequently Asked Questions</h2>
        </motion.div>
        
        <div className="glass-panel p-8 rounded-3xl border border-white/15">
          {[
            {
              q: "Is HustleFinder free to use?",
              a: "Yes! Generating side hustle ideas, saving them to your dashboard, and tracking your progress is completely free."
            },
            {
              q: "How does the AI matching algorithm work?",
              a: "We leverage Large Language Models (like OpenAI GPT-4o) to analyze your skills, interests, budget, and time availability to generate tailored business models."
            },
            {
              q: "What if I don't have specialized tech skills?",
              a: "That's completely fine! The AI is designed to suggest low-barrier opportunities requiring zero prior experience."
            },
            {
              q: "How does the 24/7 AI Chatbot assist me?",
              a: "The floating chatbot is powered by Google Gemini and can answer questions about executing your side hustles, overcoming roadblocks, or choosing tools."
            }
          ].map((faq, idx) => (
            <FAQItem key={idx} index={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-extrabold text-white mb-8 leading-tight"
          >
            Ready to change your financial future?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-200 mb-10 max-w-2xl mx-auto"
          >
            Stop waiting for the perfect opportunity. Let our AI build it for you in seconds.
          </motion.p>
          
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link 
              to="/discover"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-900 rounded-full font-bold text-xl transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
            >
              Generate My Hustle <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
