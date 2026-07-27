import React from 'react';
import { Sparkles, Globe, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/10 pt-16 pb-8 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary-500/20 p-2 rounded-xl">
                <Sparkles className="w-5 h-5 text-primary-400" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">Hustle<span className="text-primary-400">Finder</span></span>
            </Link>
            <p className="text-gray-400 max-w-sm">
              Empowering individuals to find their perfect side hustle and generate extra income through the power of AI.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/discover" className="text-gray-400 hover:text-primary-400 transition-colors">Discover</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-primary-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/progress" className="text-gray-400 hover:text-primary-400 transition-colors">Progress Tracker</Link></li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-500/20 hover:text-primary-400 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-500/20 hover:text-primary-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-500/20 hover:text-primary-400 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} HustleFinder. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
