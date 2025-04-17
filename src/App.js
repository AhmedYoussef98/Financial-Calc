// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './styles/themes/ThemeContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import UseCasesPage from './pages/UseCasesPage';
import LoadingScreen from './components/UI/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <LoadingScreen loading={loading} setLoading={setLoading} />
      
      {!loading && (
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cases" element={<UseCasesPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;