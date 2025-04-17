import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import UseCasesPage from './pages/UseCasesPage';

function App() {
  return (
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
  );
}

export default App;