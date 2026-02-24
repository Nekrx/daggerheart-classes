import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function DetailsPage() {
  const { pairId } = useParams();
  const navigate = useNavigate();

  const displayName = pairId ? pairId.replace('-', ' + ') : "Combinação Desconhecida";

  return (
    <div className="details-page">
      <button className="btn-return" onClick={() => navigate('/')}>
        ← Voltar para a Forja
      </button>

      <div className="thematic-frame">
        <h1 className="thematic-title">{displayName}</h1>
        
        <div className="ink-divider" />

        <div className="info-body">
          <p>
            As escrituras sobre este domínio de <strong>Daggerheart</strong> estão sendo reveladas. 
            Esta combinação representa a união de forças que moldarão o destino do seu herói.
          </p>
          
          <p style={{ marginTop: '30px', fontStyle: 'italic', color: '#555' }}>
            [Insira aqui suas notas de classe, habilidades ou lore do RPG]
          </p>
        </div>
      </div>
    </div>
  );
}