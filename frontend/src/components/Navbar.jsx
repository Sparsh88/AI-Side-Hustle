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
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary-500/20 p-2 rounded-xl group-hover:bg-primary-500/30 transition-colors">
              <Sparkles className="w-5 h-5 text-primary-400" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">Hustle<span className="text-primary-400">Finder</span></span>
          </Link>

          {/* Nav Links */}
          <div className="flex space-x-1 sm:space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
