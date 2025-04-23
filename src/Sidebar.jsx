import React from 'react';

export default function Sidebar({ allBaseSpells, filterBaseSpell, setFilterBaseSpell, tierData, selectedTiers, setSelectedTiers }) {
  return (
    <div style={{ width: '220px', padding: '1rem', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
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

      <h3 style={{ marginTop: '2rem' }}>Tiers</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tierData.map(t => {
          const tierName = t.tierName || t.tier_name;
          return (
            <li key={tierName}>
              <label style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedTiers.includes(tierName)}
                  onChange={() =>
                    setSelectedTiers(prev =>
                      prev.includes(tierName)
                        ? prev.filter(tn => tn !== tierName)
                        : [...prev, tierName]
                    )
                  }
                />
                <span style={{ marginLeft: '0.5rem' }}>{tierName}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
