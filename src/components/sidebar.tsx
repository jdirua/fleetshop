'use client';

import { ChevronLeft, Home, FileText, ShoppingCart, Settings, BarChart2, Briefcase, Fuel, Clipboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import Logo from './logo';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'manager', 'readonly'] },
  { href: '/dashboard/vehicles', label: 'Vehicles', icon: Briefcase, roles: ['admin', 'manager', 'readonly'] },
  { href: '/dashboard/work-orders', label: 'Work Orders', icon: FileText, roles: ['admin', 'manager', 'readonly'] },
  { href: '/dashboard/fuel-logs', label: 'Fuel Logs', icon: Fuel, roles: ['admin', 'manager', 'readonly'] },
  { href: '/dashboard/activity-log', label: 'Activity Log', icon: Clipboard, roles: ['admin', 'manager', 'readonly'] },
  { href: '/dashboard/reports', label: 'Reports', icon: BarChart2, roles: ['admin', 'manager', 'readonly'] },
  { href: '/dashboard/documents', label: 'Documents', icon: FileText, roles: ['admin', 'manager', 'readonly'] },
  { href: '/dashboard/vendors', label: 'Vendors', icon: ShoppingCart, roles: ['admin', 'manager'] },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings, roles: ['admin'] },
];

const iconColors: { [key: string]: string } = {
  '/dashboard': '#3b82f6', // blue
  '/dashboard/vehicles': '#10b981', // green
  '/dashboard/work-orders': '#f97316', // orange
  '/dashboard/fuel-logs': '#ef4444', // red
  '/dashboard/activity-log': '#8b5cf6', // violet
  '/dashboard/reports': '#3b82f6', // blue
  '/dashboard/documents': '#10b981', // green
  '/dashboard/vendors': '#f97316', // orange
  '/dashboard/settings': '#ef4444', // red
};

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    const { user } = useUser();

    const userRole = user?.role || 'readonly';

    const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

    return (
        <aside className={`bg-secondary text-white flex flex-col h-full transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
          <div className="p-4 border-b border-slate-700 flex justify-between items-center h-[68px]">
            {!isCollapsed && <Logo />}
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 rounded-full text-muted-foreground hover:bg-muted">
              <ChevronLeft className={`h-6 w-6 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <nav className="flex-1 p-2 space-y-2">
            {filteredNavItems.map((item) => {
              const isActive = item.href === '/dashboard'
                ? (pathname === '/dashboard' || pathname === '/dashboard/')
                : pathname.startsWith(item.href);

              const linkClasses = `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${isCollapsed ? 'justify-center' : ''}
                ${isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                  : 'text-slate-300 bg-black/20 shadow-inner shadow-black/80 hover:text-white hover:bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/20'}`;

              return (
                <Link key={item.href} href={item.href} className={linkClasses}>
                  <item.icon className="h-5 w-5 shrink-0" style={{ color: iconColors[item.href] }} />
                  {!isCollapsed && <span className="flex-1">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </aside>
    );
};

export default Sidebar;
