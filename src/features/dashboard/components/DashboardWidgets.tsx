import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Star } from 'lucide-react';

export function PredictionCard() {
  return (
    <div className="bg-background border-4 border-grid-line p-6 relative overflow-hidden group hover:border-accent-yellow transition-colors duration-300 box-shadow-hard">
      {/* Decorative Background Text */}
      <div className="absolute -right-4 -bottom-4 text-9xl font-anton text-white opacity-5 pointer-events-none select-none">
        FUTURE
      </div>

      <div className="flex justify-between items-start mb-4">
        <h2 className="text-3xl font-anton text-accent-yellow uppercase tracking-wide">
          Prediction
        </h2>
        <Sparkles className="text-accent-yellow" size={32} />
      </div>

      <div className="relative z-10">
        <div className="text-6xl font-anton text-white mb-2 text-shadow-hard">
          92%
        </div>
        <p className="text-text-secondary font-sans text-lg">
          Predicted Final Score based on current trajectory.
        </p>
      </div>

      <div className="mt-6 flex gap-2">
        <span className="bg-accent-red text-white text-xs font-bold px-2 py-1 uppercase">High Probability</span>
        <span className="bg-grid-line text-black text-xs font-bold px-2 py-1 uppercase">Top 10%</span>
      </div>
    </div>
  );
}

export function RiskLevelIndicator() {
  return (
    <div className="bg-accent-red border-4 border-black p-6 text-white box-shadow-hard flex flex-col justify-between h-full">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle size={32} className="text-accent-yellow" />
        <h2 className="text-3xl font-anton uppercase tracking-wide">RISK LEVEL</h2>
      </div>
      
      <div className="text-center py-8">
        <span className="text-7xl font-anton tracking-tighter text-shadow-hard">LOW</span>
      </div>

      <div className="w-full bg-black/20 h-4 rounded-full overflow-hidden border-2 border-black">
        <div className="bg-accent-yellow h-full w-[20%]"></div>
      </div>
      <p className="text-white/80 font-sans text-sm mt-2 text-center">Maintain current study pace.</p>
    </div>
  );
}

export function RecommendationsPanel() {
  const recommendations = [
    "Review Calculus Chapter 4",
    "Complete Physics Lab Report",
    "Join Study Group for History",
  ];

  return (
    <div className="bg-white border-4 border-black p-6 text-black box-shadow-hard h-full">
      <h2 className="text-3xl font-anton uppercase mb-6 flex items-center gap-2">
        <Star className="text-accent-yellow fill-accent-yellow" size={28} />
        Top Actions
      </h2>
      
      <ul className="space-y-4">
        {recommendations.map((rec, i) => (
          <li key={i} className="flex items-start gap-3 group cursor-pointer">
            <div className="w-6 h-6 bg-black text-white flex items-center justify-center font-anton text-sm mt-1 group-hover:bg-accent-red transition-colors">
              {i + 1}
            </div>
            <p className="font-sans text-lg font-bold uppercase leading-tight group-hover:underline decoration-4 decoration-accent-yellow underline-offset-4">
              {rec}
            </p>
          </li>
        ))}
      </ul>
      
       <div className="mt-8">
        <button className="w-full bg-black text-white py-3 font-anton uppercase hover:bg-accent-blue hover:text-white transition-colors border-2 border-transparent hover:border-black">
            View All Tasks
        </button>
      </div>
    </div>
  );
}
