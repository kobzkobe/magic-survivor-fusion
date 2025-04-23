import React from 'react';

const BaseSpellFilter = ({ allBaseSpells, filterBaseSpell, setFilterBaseSpell }) => {
  return (
    <div style={{ width: '20%', padding: '1rem', borderRight: '1px solid #ccc' }}>
      <h3>Base Spells</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {allBaseSpells.map(spell => (
          <li
            key={spell}
            onClick={() => setFilterBaseSpell(spell === filterBaseSpell ? null : spell)}
            style={{
              cursor: 'pointer',
              padding: '0.5rem',
              backgroundColor: spell === filterBaseSpell ? '#ddd' : 'transparent',
              borderRadius: '4px'
            }}
          >
            {spell}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BaseSpellFilter;
