import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  User, 
  ListTodo, 
  GraduationCap, 
  PieChart, 
  ArrowRightLeft, 
  LogOut 
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'DASHBOARD', href: '/dashboard', icon: LayoutDashboard },
  { name: 'PROFILE', href: '/profile', icon: User },
  { name: 'TO-STUDY', href: '/to-study', icon: ListTodo },
  { name: 'GRADES', href: '/grades', icon: GraduationCap },
  { name: 'PERCENTAGES', href: '/percentages', icon: PieChart },
  { name: 'COMPARISONS', href: '/comparisons', icon: ArrowRightLeft },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-full bg-background border-r-4 border-grid-line flex flex-col justify-between p-6 relative z-50">
      {/* Brand Label */}
      <div className="mb-12">
        <div className="bg-accent-red text-white text-xs font-bold px-3 py-1 inline-block uppercase tracking-widest transform -rotate-2 box-shadow-hard mb-4">
          Fashion Brand.
        </div>
        <h1 className="text-5xl font-anton text-foreground leading-[0.85] tracking-tight">
          STUDISTIC<br/>
          <span className="text-accent-yellow">VIBES.</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6">
        {NAV_ITEMS.map((item) => (
          <Link 
            key={item.name} 
            href={item.href}
            className="group flex items-center gap-4 text-xl font-anton text-text-secondary hover:text-foreground transition-colors duration-200"
          >
            <div className="p-2 border-2 border-transparent group-hover:border-accent-yellow group-hover:bg-accent-yellow group-hover:text-background transition-all">
              <item.icon size={24} />
            </div>
            <span className="tracking-wide">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="mt-8 pt-8 border-t-4 border-grid-line">
         <button className="w-full flex items-center justify-between bg-shadow text-white p-4 hover:bg-accent-red transition-colors duration-200 group">
            <span className="font-anton text-xl tracking-wider">LOGOUT</span>
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
         </button>
      </div>
      
      {/* Decorative Grid Lines Overlay (Optional visual flair) */}
      <div className="absolute top-0 right-0 w-[1px] h-full bg-grid-line opacity-20 pointer-events-none"></div>
    </aside>
  );
}
