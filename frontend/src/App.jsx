import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';
import Progress from './pages/Progress';
import HustleDetail from './pages/HustleDetail';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-600/20 blur-[120px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-purple-600/20 blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <Navbar />

      {/* Routes */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/hustle/:id" element={<HustleDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>

      {/* Global Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;
