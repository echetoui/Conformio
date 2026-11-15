import React, { useState } from 'react';

const regions = [
  { id: 'ca', label: 'Canada', note: 'Point de départ régional' },
  { id: 'us', label: 'États-Unis', note: 'Marché international' },
  { id: 'eu', label: 'Europe', note: 'Horizon d’expansion' },
];

export default function InternationalGlobePrototype() {
  const [activeRegion, setActiveRegion] = useState('ca');
  const region = regions.find((item) => item.id === activeRegion) ?? regions[0];

  return (
    <div className="spatial-orbital-stage" aria-label="Prototype visuel de cartographie internationale">
      <div className="spatial-globe" aria-hidden="true">
        <span className="spatial-signal signal-one" />
        <span className="spatial-signal signal-two" />
        <span className="spatial-signal signal-three" />
      </div>
      <div className="spatial-orbit" aria-hidden="true" />
      <div className="spatial-orbit orbit-two" aria-hidden="true" />
      <div className="glass-panel absolute bottom-2 left-1/2 z-10 w-[min(20rem,92%)] -translate-x-1/2 rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="spatial-kicker">Global view</span>
          <span className="text-xs text-slate-400">{region.note}</span>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Sélection de région">
          {regions.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={activeRegion === item.id}
              onClick={() => setActiveRegion(item.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${activeRegion === item.id ? 'bg-cyan-300 text-slate-950' : 'border border-white/15 text-slate-300 hover:border-cyan-300/60 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
