import React from 'react';
import { PredictionCard, RiskLevelIndicator, RecommendationsPanel } from './DashboardWidgets';

export function DashboardView() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-4 border-white/10 pb-6">
        <div>
          <h1 className="text-6xl md:text-8xl font-anton text-white leading-none tracking-tight text-shadow-hard">
            SUMMER<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-yellow to-accent-red">VIBES</span>
          </h1>
          <p className="text-text-secondary font-sans text-xl mt-2 max-w-md">
            Welcome back, H0554M. Your academic performance is trending upwards.
          </p>
        </div>
        <div className="bg-accent-yellow text-black font-anton text-xl px-6 py-3 box-shadow-hard transform rotate-2 hover:rotate-0 transition-transform cursor-default">
          SEMESTER 4 • WEEK 8
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column (Primary Stats) */}
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <PredictionCard />
          </div>
          <div className="h-full">
             {/* Placeholder for a chart or another metric */}
             <div className="bg-accent-yellow/10 border-4 border-dashed border-accent-yellow h-64 flex items-center justify-center">
                <span className="font-anton text-accent-yellow text-2xl uppercase">Performance Chart</span>
             </div>
          </div>
          <div className="h-full">
            <RiskLevelIndicator />
          </div>
        </div>

        {/* Right Column (Secondary / Actions) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <RecommendationsPanel />
          
          {/* Ad-style promo block */}
          <div className="bg-black text-white p-6 border-4 border-white overflow-hidden relative group cursor-pointer">
             <div className="absolute top-0 right-0 w-24 h-24 bg-accent-red rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
             <h3 className="text-4xl font-anton relative z-10">
                UNLOCK<br/>PREMIUM
             </h3>
             <p className="text-text-secondary font-sans mt-2 relative z-10 text-sm">
                Get distinct insights and advanced analytics.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
