import React from 'react';
import { Sparkles } from 'lucide-react';
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
            <div className="flex gap-3">
              <a
                href="https://wa.me/917088951914"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp (7088951914)"
                className="w-10 h-10 bg-white/5 hover:bg-[#25D366]/20 text-gray-400 hover:text-[#25D366] rounded-xl flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#25D366]/30 hover:scale-105"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.11C9.36 7.11 9.08 7.17 8.84 7.43C8.6 7.69 7.93 8.32 7.93 9.58C7.93 10.84 8.86 12.06 8.99 12.23C9.12 12.4 10.8 15.01 13.41 16.14C15.03 16.84 15.68 16.62 16.34 16.56C17.11 16.49 18.25 15.54 18.49 14.86C18.73 14.18 18.73 13.6 18.66 13.48C18.59 13.36 18.42 13.29 18.16 13.16C17.9 13.03 16.64 12.41 16.41 12.32C16.18 12.23 16.01 12.19 15.84 12.45C15.67 12.71 15.18 13.29 15.03 13.46C14.88 13.63 14.73 13.65 14.47 13.52C14.21 13.39 13.37 13.12 12.38 12.24C11.61 11.55 11.09 10.7 10.94 10.44C10.79 10.18 10.92 10.04 11.05 9.91C11.17 9.79 11.31 9.61 11.45 9.45C11.59 9.29 11.64 9.17 11.73 9C11.82 8.83 11.78 8.68 11.72 8.56C11.66 8.44 11.19 7.28 10.99 6.8C10.8 6.33 10.6 6.39 10.45 6.38C10.31 6.38 10.15 6.38 9.98 6.38C9.81 6.38 9.53 7.11 9.53 7.11Z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/sparshchauhan050"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram (@sparshchauhan050)"
                className="w-10 h-10 bg-white/5 hover:bg-[#E4405F]/20 text-gray-400 hover:text-[#E4405F] rounded-xl flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#E4405F]/30 hover:scale-105"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://t.me/sparshchauhan050"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram (@sparshchauhan050)"
                className="w-10 h-10 bg-white/5 hover:bg-[#229ED9]/20 text-gray-400 hover:text-[#229ED9] rounded-xl flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-[#229ED9]/30 hover:scale-105"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
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
