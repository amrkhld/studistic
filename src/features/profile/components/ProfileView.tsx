import React from 'react';
import { ProfileHeader, StatsGrid, BioSection } from './ProfileWidgets';

export function ProfileView() {
  return (
    <div className="min-h-full bg-white animate-fade-in pb-12">
      <ProfileHeader />
      
      <div className="container mx-auto px-4">
        <StatsGrid />
        <BioSection />
      </div>
    </div>
  );
}
