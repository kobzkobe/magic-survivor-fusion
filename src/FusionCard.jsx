import React from 'react';

export default function FusionCard({ fusion, selected, disabled, onClick, dim, tier, tierColor, highlightedSpells }) {
  // Determine contrast color for smart readability
  const getContrastColor = (bgColor) => {
    if (!bgColor) return '#000';
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 186 ? '#000' : '#fff';
  };

  const backgroundColor = selected ? tierColor : '#222';
  const textColor = selected ? getContrastColor(tierColor) : '#fff';
  const borderColor = tierColor;

  const shouldBold = (spellName, variant) =>
    highlightedSpells?.some(s => s.baseSpellName === spellName && s.variant === variant);

  return (
    <div
      onClick={() => !disabled && onClick(fusion)}
      style={{
        padding: '1rem',
        margin: '0.5rem',
        border: `2px solid ${borderColor}`,
        backgroundColor,
        color: textColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled || dim ? 0.1 : 1,
        borderRadius: '8px',
        width: '200px',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <img src={fusion.imageUri} style={{ width: '100%', borderRadius: '4px', marginBottom: '0.5rem' }} />
      <h2 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>
        {fusion.fusionName}
        <span style={{ fontSize: '0.9rem', color: textColor === '#000' ? '#444' : '#ddd', marginLeft: '0.5rem' }}>
          ({tier})
        </span>
      </h2>
      <ul style={{ listStyleType: 'none', paddingLeft: 0, fontSize: '0.85rem' }}>
      {fusion.baseRequirements.map((req, i) => (
          <li key={i}>
            <span style={{ textDecoration: shouldBold(req.baseSpellName, req.variant) ? 'underline' : 'none' }}>
              {req.baseSpellName}
            </span>{' '}
            (<i>{req.variant}</i>)
          </li>
        ))}
      </ul>
    </div>
  );
}
