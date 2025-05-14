import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import DatasetManagementPage from './pages/DatasetManagementPage';
import LiveRecognitionPage from './pages/LiveRecognitionPage';
import VerificationPage from './pages/VerificationPage';
import AnalyticsPage from './pages/AnalyticsPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminPanelPage from './pages/AdminPanelPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/dataset" element={<DatasetManagementPage />} />
            <Route path="/live-recognition" element={<LiveRecognitionPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/admin" element={<AdminPanelPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;