import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useWordForge } from './hooks/useWordForge';
import { SortablePair } from './components/SortablePair'; // Nome correto aqui
import { PairCard } from './components/PairCard';
import './App.css';

export default function App() {
  const { words, pairs, updateWord, reorderPairs } = useWordForge();
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: { distance: 8 }
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
        <h1 className="main-title">DOMÍNIOS DAGGERHEART
        </h1>
        <div className="ornament-divider" />
      </header>

      <div className="editor-panel">
        <div className="input-row">
          {words.map((w, i) => (
            <input 
              key={i} 
              className="dark-input" 
              value={w} 
              onChange={(e) => updateWord(i, e.target.value)} 
            />
          ))}
        </div>
      </div>

      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={pairs.map(p => p.id)} strategy={rectSortingStrategy}>
          <div className="forge-grid">
            {pairs.map(pair => (
              /* MUDADO DE SortableItem PARA SortablePair */
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