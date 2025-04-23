import React, { useState, useEffect } from 'react';
import SelectedBaseSpells from './SelectedBaseSpells';
import FusionCard from './FusionCard';
import Sidebar from "./Sidebar"
import './App.css';

import fusionData from './data/fusions.json';
import tierData from './data/tierlist.json';



function getSelectedRequirements(selectedFusions) {
  return selectedFusions.flatMap(fusion => fusion.baseRequirements);
}

function hasConflict(selectedRequirements, candidateRequirements) {
  return selectedRequirements.some(sel =>
    candidateRequirements.some(cand =>
      sel.baseSpellName === cand.baseSpellName && sel.variant !== cand.variant
    )
  );
}

export default function App() {
  const [selectedFusions, setSelectedFusions] = useState([]);
  const [filterBaseSpell, setFilterBaseSpell] = useState(null);
  const [selectedTiers, setSelectedTiers] = useState(tierData.map(t => t.tierName || t.tier_name));

  const allBaseSpells = Array.from(
    new Set(fusionData.flatMap(f => f.baseRequirements.map(r => r.baseSpellName)))
  ).sort();

  const toggleFusion = (fusion) => {
    const alreadySelected = selectedFusions.find(f => f.fusionName === fusion.fusionName);
    setSelectedFusions(
      alreadySelected
        ? selectedFusions.filter(f => f.fusionName !== fusion.fusionName)
        : [...selectedFusions, fusion]
    );
  };

  const selectedRequirements = getSelectedRequirements(selectedFusions);

  const isDisabled = (fusion) => {
    if (selectedFusions.find(f => f.fusionName === fusion.fusionName)) return false;
    return hasConflict(selectedRequirements, fusion.baseRequirements);
  };

  const getTierInfo = (fusionName) => {
    for (const tier of tierData) {
      if (tier.fusions.includes(fusionName)) {
        return {
          name: tier.tierName || tier.tier_name,
          color: tier.color
        };
      }
    }
    return { name: 'Unranked', color: '#ccc' };
  };

  const filteredAndSortedFusions = fusionData
    .map(fusion => ({
      ...fusion,
      tierInfo: getTierInfo(fusion.fusionName)
    }))
    .filter(f => selectedTiers.includes(f.tierInfo.name))
    .sort((a, b) => {
      const tierOrder = tierData.map(t => t.tierName || t.tier_name);
      const tierDiff = tierOrder.indexOf(a.tierInfo.name) - tierOrder.indexOf(b.tierInfo.name);
      return tierDiff !== 0 ? tierDiff : a.fusionName.localeCompare(b.fusionName);
    });

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}

      <Sidebar allBaseSpells={allBaseSpells} filterBaseSpell={filterBaseSpell} setFilterBaseSpell={setFilterBaseSpell} tierData={tierData} selectedTiers={selectedTiers} setSelectedTiers={setSelectedTiers}></Sidebar>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <SelectedBaseSpells selectedFusions={selectedFusions} />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {filteredAndSortedFusions.map(fusion => {
            const selected = selectedFusions.some(f => f.fusionName === fusion.fusionName);
            const disabled = isDisabled(fusion);
            const matchesFilter = filterBaseSpell
              ? fusion.baseRequirements.some(r => r.baseSpellName === filterBaseSpell)
              : true;

            return (
              <FusionCard
                key={fusion.fusionName}
                fusion={fusion}
                selected={selected}
                disabled={disabled}
                onClick={toggleFusion}
                dim={!matchesFilter}
                tier={fusion.tierInfo.name}
                tierColor={fusion.tierInfo.color}
                highlightedSpells={selectedRequirements}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
