import React from 'react';
import { Mail, Phone, MapPin, Calendar, Edit3 } from 'lucide-react';

export function ProfileHeader() {
  return (
    <div className="relative mb-12">
      {/* Dynamic Background Banner */}
      <div className="h-48 bg-grid-line w-full border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 font-anton text-9xl text-black leading-none select-none pointer-events-none transform rotate-3 scale-110">
          STUDENT PORTFOLIO
        </div>
      </div>

      <div className="container mx-auto px-4 relative -mt-20 flex flex-col md:flex-row items-end gap-6">
        {/* Avatar Frame */}
        <div className="relative group">
          <div className="w-40 h-40 bg-gray-200 border-4 border-black box-shadow-hard overflow-hidden relative z-10">
            {/* Placeholder styling for avatar */}
            <div className="w-full h-full bg-accent-blue flex items-center justify-center font-anton text-5xl text-white">
              HH
            </div>
            {/* Hover overlay hint */}
             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <span className="text-white font-anton uppercase text-sm">Change Photo</span>
             </div>
          </div>
          {/* Decorative element behind avatar */}
          <div className="absolute -inset-2 bg-accent-yellow z-0 transform rotate-3 border-4 border-black"></div>
        </div>

        {/* Name & Status */}
        <div className="mb-2 flex-1">
          <h1 className="text-6xl md:text-7xl font-anton text-black leading-none text-shadow-hard mb-2">
            HOSSAM<br/>HUSSEN
          </h1>
          <div className="flex flex-wrap gap-3">
             <span className="bg-black text-white font-anton px-3 py-1 text-lg uppercase transform -rotate-1">
               Computer Science
             </span>
             <span className="bg-accent-red text-white font-anton px-3 py-1 text-lg uppercase transform rotate-1">
               Year 4
             </span>
          </div>
        </div>

        {/* Edit Action */}
        <button className="bg-accent-yellow border-4 border-black p-4 box-shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all mb-4 md:mb-8 active:bg-accent-yellow/80">
          <Edit3 size={24} className="text-black" />
        </button>
      </div>
    </div>
  );
}

export function StatsGrid() {
  const stats = [
    { label: "GPA", value: "3.8", color: "bg-accent-blue", textColor: "text-white" },
    { label: "Attendance", value: "98%", color: "bg-accent-yellow", textColor: "text-black" },
    { label: "Credits", value: "112", color: "bg-black", textColor: "text-white" },
    { label: "Rank", value: "#5", color: "bg-accent-red", textColor: "text-white" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, i) => (
        <div 
          key={stat.label} 
          className={`${stat.color} border-4 border-black p-4 box-shadow-hard min-h-[140px] flex flex-col justify-between transform transition-transform hover:-translate-y-1 hover:rotate-1`}
        >
          <span className={`${stat.textColor} font-sans font-bold text-sm uppercase opacity-80`}>
            {stat.label}
          </span>
          <span className={`${stat.textColor} font-anton text-5xl md:text-6xl leading-none`}>
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function BioSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left Col: Contact Info */}
      <div className="md:col-span-1 bg-white border-4 border-black p-6 box-shadow-hard">
        <h3 className="font-anton text-2xl mb-6 flex items-center gap-2">
          <span className="w-3 h-3 bg-accent-red rounded-full"></span>
          CONTACT
        </h3>
        <ul className="space-y-4 font-sans text-lg">
          <li className="flex items-center gap-3">
            <Mail className="text-accent-blue" size={20} />
            <span className="truncate">hossamhussen5@gmail.com</span>
          </li>
          <li className="flex items-center gap-3">
            <Phone className="text-accent-blue" size={20} />
            <span>+20 123 456 7890</span>
          </li>
          <li className="flex items-center gap-3">
            <MapPin className="text-accent-blue" size={20} />
            <span>Cairo, Egypt</span>
          </li>
          <li className="flex items-center gap-3">
            <Calendar className="text-accent-blue" size={20} />
            <span>Joined Sept 2022</span>
          </li>
        </ul>
      </div>

       {/* Right Col: Bio Text */}
       <div className="md:col-span-2 bg-white border-4 border-black p-8 box-shadow-hard relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-grid-line border-l-4 border-b-4 border-black"></div>
          
          <h3 className="font-anton text-4xl mb-6 uppercase">About Me</h3>
          <p className="font-sans text-xl leading-relaxed text-gray-800 mb-6">
            Aspiring Software Engineer specializing in Frontend Development and UI/UX Design. 
            Passion for creating <span className="font-bold bg-accent-yellow px-1">high-impact</span> digital experiences. 
            Currently focused on mastering Next.js and Tailwind CSS while maintaining academic excellence.
          </p>
          
          <div className="flex gap-2 flex-wrap">
             {['React', 'Next.js', 'Tailwind', 'TypeScript', 'Figma'].map(tag => (
                <span key={tag} className="border-2 border-black px-3 py-1 font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-default">
                   #{tag}
                </span>
             ))}
          </div>
       </div>
    </div>
  );
}
