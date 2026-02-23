// src/components/DomainPortfolio.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWordForge } from '../hooks/useWordForge';

export function DomainPortfolio() {
  const { words } = useWordForge();
  const navigate = useNavigate();

  return (
    <div className="portfolio-page">
      <header className="portfolio-header">
        <button className="btn-return" onClick={() => navigate('/')}>← VOLTAR À FORJA</button>
        <h1 className="thematic-title">Grimório de Domínios</h1>
        <p className="portfolio-subtitle">As essências puras antes da combinação</p>
      </header>

      <div className="portfolio-grid">
        {words.map((word, index) => (
          <div key={index} className="domain-card-art">
            <div className="card-inner-border">
              {/* Espaço para a Imagem */}
              <div className="domain-image-placeholder">
                 <span className="ink-icon">✦</span>
                 {/* Quando tiver as imagens, use: <img src={`/assets/${word}.jpg`} alt={word} /> */}
              </div>
              
              <div className="domain-info">
                <h2 className="domain-name">{word}</h2>
                <div className="ink-divider-small" />
                <p className="domain-type">Domínio Base</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}