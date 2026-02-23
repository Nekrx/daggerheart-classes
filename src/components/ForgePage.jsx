import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useNavigate } from 'react-router-dom'; 

import { useWordForge } from '../hooks/useWordForge';
import { SortablePair } from './SortablePair';
import { PairCard } from './PairCard';
import '../App.css';

export default function ForgePage() { 
  // Removido 'words' e 'updateWord' pois os inputs não aparecem mais aqui
  const { pairs, reorderPairs } = useWordForge();
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: { distance: 10 }
  }));

  const handleDragStart = (e) => setActiveId(e.active.id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderPairs(active.id, over.id);
    }
    setActiveId(null);
  };

  const activePair = pairs.find(p => p.id === activeId);

  return (
    <div className="page-container">
      <header className="game-header">
        <h1 className="main-title">Domínios Daggerheart</h1>
        
        {/* Grupo de botões de categorias centralizado */}
        <nav className="main-nav">
          <button className="btn-menu" onClick={() => navigate('/portfolio')}>
            Domínios
          </button>
          <button className="btn-menu" onClick={() => navigate('/ancestralidade')}>
            Ancestralidade
          </button>
          <button className="btn-menu" onClick={() => navigate('/comunidade')}>
            Comunidade
          </button>
          <button className="btn-menu" onClick={() => navigate('/classe')}>
            Classe
          </button>
        </nav>

        <div className="ornament-divider" />
      </header>

      {/* A área 'editor-panel' foi removida completamente daqui */}

      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={pairs.map(p => p.id)} strategy={rectSortingStrategy}>
          <div className="forge-grid">
            {pairs.map(pair => (
              <SortablePair key={pair.id} pair={pair} />
            ))}
          </div>
        </SortableContext>

        <DragOverlay adjustScale={true}>
          {activePair ? <PairCard pair={activePair} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}