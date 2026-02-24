import React from 'react';
import { useNavigate } from 'react-router-dom';

export function ComingSoonPage({ title }) {
  const navigate = useNavigate();
  return (
    <div className="details-page">
      <button className="btn-return" onClick={() => navigate('/')}>← VOLTAR</button>
      <div className="thematic-frame">
        <h1 className="thematic-title">{title}</h1>
        <div className="ink-divider" />
        <p style={{color: '#d4af37'}}>EM BREVE</p>
      </div>
    </div>
  );
}