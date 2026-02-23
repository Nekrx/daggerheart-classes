import React from 'react';
import { Link } from 'react-router-dom';

export function PairCard({ pair, isDragging }) {
  // Define a cor de fundo (usa a cor da regra ou o cinza padrão)
  const bgColor = pair.defaultColor || '#151515';
  
  // Criamos o ID da URL de forma organizada (ex: "Blade-Bone")
  const pairPath = [pair.first, pair.second].sort().join("-");

  return (
    <Link 
      to={`/details/${pairPath}`} 
      className="card-link-wrapper"
      style={{ textDecoration: 'none', color: 'inherit' }}
      // O SEGREDO: Se estiver arrastando, impedimos a navegação
      onClick={(e) => isDragging && e.preventDefault()}
    >
      <div 
        className={`pair-card ${isDragging ? 'is-dragging' : ''}`}
        style={{ 
          backgroundColor: bgColor,
          border: `4px solid ${pair.defaultColor ? 'rgba(255,255,255,0.2)' : '#333'}`,
          boxShadow: isDragging ? '0 20px 40px rgba(0,0,0,0.5)' : 'none'
        }}
      >
        <div className="card-content">
          <span className="word-text">{pair.first}</span>
          <span className="plus-symbol">+</span>
          <span className="word-text">{pair.second}</span>
        </div>
      </div>
    </Link>
  );
}