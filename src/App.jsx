import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgePage from './components/ForgePage';
import { DetailsPage } from './components/DetailsPage';
import { DomainPortfolio } from './components/DomainPortfolio';
import { ComingSoonPage } from './components/ComingSoonPage'; 

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ForgePage />} />
        <Route path="/details/:pairId" element={<DetailsPage />} />
        <Route path="/portfolio" element={<DomainPortfolio />} />
        <Route path="/ancestralidade" element={<ComingSoonPage title="Ancestralidade" />} />
        <Route path="/comunidade" element={<ComingSoonPage title="Comunidade" />} />
        <Route path="/classe" element={<ComingSoonPage title="Classe" />} />
      </Routes>
    </BrowserRouter>
  );
}