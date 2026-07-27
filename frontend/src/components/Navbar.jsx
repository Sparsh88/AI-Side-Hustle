import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Compass, Rocket, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Discover', path: '/discover', icon: Compass },
    { name: 'Progress', path: '/progress', icon: Rocket },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-surface/70 backdrop-blur-2xl border-b border-white/10 w-full transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="bg-primary-500/20 p-2 rounded-xl border border-primary-500/30 group-hover:bg-primary-500/30 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all"
            >
              <Sparkles className="w-5 h-5 text-primary-400" />
            </motion.div>
            <span className="font-bold text-xl text-white tracking-tight">
              Hustle<span className="text-gradient">Finder</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex space-x-1 sm:space-x-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-primary-600/30 border border-primary-500/40 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <item.icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-primary-300' : ''}`} />
                    <span className="hidden sm:inline relative z-10">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
