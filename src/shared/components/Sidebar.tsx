'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/assets/general/logo.png';
import {
  LayoutDashboard,
  User,
  KanbanSquare,
  GraduationCap,
  PieChart,
  ArrowRightLeft,
  LogOut
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'To-Study', href: '/to-study', icon: KanbanSquare },
  { name: 'Grades', href: '/grades', icon: GraduationCap },
  { name: 'Percentages', href: '/percentages', icon: PieChart },
  { name: 'Comparisons', href: '/comparisons', icon: ArrowRightLeft },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] min-w-[240px] h-full flex flex-col justify-between py-6 px-4 relative"
      style={{
        background: 'var(--background-secondary)',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* Logo */}
      <div>
        <div className="mb-8 px-2">
          <Image
            src={Logo}
            alt="Studistic Logo"
            width={180}
            height={50}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive ? 'var(--foreground)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(255, 196, 0, 0.1)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--accent-yellow)' : '3px solid transparent',
                }}
              >
                <item.icon size={18} style={{ color: isActive ? 'var(--accent-yellow)' : 'var(--text-secondary)' }} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div style={{ borderTop: '1px solid var(--border)' }} className="pt-4">
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-red)';
            e.currentTarget.style.background = 'rgba(240, 74, 42, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
