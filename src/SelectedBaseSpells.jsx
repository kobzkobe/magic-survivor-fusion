import React from 'react';

export default function SelectedBaseSpells({ selectedFusions }) {
  // Flatten and group selected base spells with their variants
  const grouped = selectedFusions.flatMap(f => f.baseRequirements)
    .reduce((acc, { baseSpellName, variant }) => {
      if (!acc[baseSpellName]) acc[baseSpellName] = new Set();
      acc[baseSpellName].add(variant);
      return acc;
    }, {});

  return (
    <div style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {Object.entries(grouped).map(([spell, variants]) => (
        <span
          key={spell}
          style={{
            backgroundColor: '#e0e7ff',
            padding: '0.4rem 0.8rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: '500',
            color: "#222"
          }}
        >
          {spell} ({[...variants].join(', ')})
        </span>
      ))}
    </div>
  );
}
