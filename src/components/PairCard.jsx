import React from 'react';

export function PairCard({ pair, isDragging }) {
  const bgColor = pair.defaultColor || '#151515';
  
  return (
    <div 
      className={`pair-card ${isDragging ? 'is-dragging' : ''}`}
      style={{ 
        backgroundColor: bgColor,
        border: `4px solid ${pair.defaultColor ? 'rgba(255,255,255,0.2)' : '#333'}`,
      }}
    >
      <div className="card-content">
        <span className="word-text">{pair.first}</span>
        <span className="plus-symbol">+</span>
        <span className="word-text">{pair.second}</span>
      </div>
    </div>
  );
}