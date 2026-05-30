import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import About from './pages/About';
import ArtworkDetail from './pages/ArtworkDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Placeholder for Commissions
const Commissions = () => (
  <div className="pt-40 pb-24 max-w-3xl mx-auto px-4 text-center">
    <h1 className="text-5xl font-serif text-brand-950 mb-8">Commissions</h1>
    <p className="text-lg text-brand-700 mb-12">
      I am currently accepting custom commission requests for 2024.
      Whether you are looking for a specific size for your home or a variation
      on an existing theme, I'd love to collaborate with you.
    </p>
    <Link
      to="/contact"
      className="inline-flex px-8 py-4 bg-brand-950 text-white rounded-full font-medium hover:bg-brand-900 transition-colors"
    >
      Request a Custom Piece
    </Link>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-50 selection:bg-brand-200 selection:text-brand-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/sold-works" element={<Gallery showSold={true} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/commissions" element={<Commissions />} />
            <Route path="/artwork/:id" element={<ArtworkDetail />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>

        <footer className="bg-white border-t border-brand-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="font-serif text-xl text-brand-950 tracking-tighter">ARTIST PORTFOLIO</div>
              <div className="flex gap-8 text-sm text-brand-600">
                <Link to="/gallery" className="hover:text-brand-950 transition-colors">Gallery</Link>
                <Link to="/about" className="hover:text-brand-950 transition-colors">About</Link>
                <Link to="/contact" className="hover:text-brand-950 transition-colors">Contact</Link>
                <Link to="/login" className="hover:text-brand-950 transition-colors">Admin</Link>
              </div>
              <div className="text-sm text-brand-400 font-sans">
                &copy; {new Date().getFullYear()} Artist Portfolio. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
