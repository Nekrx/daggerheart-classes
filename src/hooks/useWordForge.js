import { useState, useCallback, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { COLOR_RULES, INITIAL_WORDS } from '../constants/gameConfig';

export const useWordForge = () => {
  const [words, setWords] = useState(INITIAL_WORDS);
  const [pairs, setPairs] = useState([]);

  const getPairColor = useCallback((wordA, wordB) => {
    const key = [wordA.trim(), wordB.trim()].sort().join("-").toLowerCase();
    const foundKey = Object.keys(COLOR_RULES).find(k => k.toLowerCase() === key);
    return foundKey ? COLOR_RULES[foundKey] : null;
  }, []);

  // src/hooks/useWordForge.js

useEffect(() => {
  const newPairs = [];
  
  // 1. Gera todas as combinações possíveis
  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      const w1 = words[i];
      const w2 = words[j];
      const color = getPairColor(w1, w2);
      
      newPairs.push({
        id: `pair-${w1}-${w2}`,
        first: w1,
        second: w2,
        defaultColor: color
      });
    }
  }

  // 2. ORDENAÇÃO: Coloca quem tem cor no topo
  const sortedPairs = newPairs.sort((a, b) => {
    // Se 'a' tem cor e 'b' não, 'a' sobe
    if (a.defaultColor && !b.defaultColor) return -1;
    // Se 'b' tem cor e 'a' não, 'b' sobe
    if (!a.defaultColor && b.defaultColor) return 1;
    // Se ambos tiverem cor (ou ambos não tiverem), mantém a ordem alfabética
    return a.id.localeCompare(b.id);
  });

  setPairs(sortedPairs);
}, [words, getPairColor]);

  const updateWord = useCallback((index, value) => {
    setWords(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const reorderPairs = useCallback((activeId, overId) => {
    setPairs((items) => {
      const oldIndex = items.findIndex((i) => i.id === activeId);
      const newIndex = items.findIndex((i) => i.id === overId);
      return arrayMove(items, oldIndex, newIndex);
    });
  }, []);

  return { words, pairs, updateWord, reorderPairs };
};