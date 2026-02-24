import { useState, useCallback, useMemo, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { COLOR_RULES, INITIAL_WORDS } from '../constants/gameConfig';

export const useWordForge = () => {
  const [words, setWords] = useState(() => {
    const saved = localStorage.getItem('forge-words');
    return saved ? JSON.parse(saved) : INITIAL_WORDS;
  });

  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    localStorage.setItem('forge-words', JSON.stringify(words));
  }, [words]);
  const getPairColor = useCallback((wordA, wordB) => {
    const key = [wordA.trim(), wordB.trim()].sort().join("-");
    return COLOR_RULES[key] || null;
  }, []);

  const generatedPairs = useMemo(() => {
    let p = [];
    for (let i = 0; i < words.length; i++) {
      for (let j = i + 1; j < words.length; j++) {
        const w1 = words[i];
        const w2 = words[j];
        const color = getPairColor(w1, w2);
        
        p.push({
          id: `pair-${w1}-${w2}`,
          first: w1,
          second: w2,
          defaultColor: color
        });
      }
    }

    // ORDENAÇÃO FORÇADA: Agrupa tudo que tem cor no início da lista
    return p.sort((a, b) => {
      const hasColorA = a.defaultColor !== null;
      const hasColorB = b.defaultColor !== null;

      if (hasColorA && !hasColorB) return -1; 
      if (!hasColorA && hasColorB) return 1; 
      return 0; 
    });
  }, [words, getPairColor]);


  useEffect(() => {
    setPairs(generatedPairs);
  }, [generatedPairs]);

  const updateWord = useCallback((index, value) => {
    const next = [...words];
    next[index] = value;
    setWords(next);
  }, [words]);

  const reorderPairs = useCallback((activeId, overId) => {
    setPairs((items) => {
      const oldIdx = items.findIndex(i => i.id === activeId);
      const newIdx = items.findIndex(i => i.id === overId);
      return arrayMove(items, oldIdx, newIdx);
    });
  }, []);

  return { words, pairs, updateWord, reorderPairs };
};