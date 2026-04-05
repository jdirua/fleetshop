'use client';

import { ChevronLeft, Home, Package, FileText, ShoppingCart, Settings, BarChart2, Briefcase, Fuel, Clipboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { ROLES } from '@/lib/auth/roles';
import Logo from './logo';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home, roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.READONLY] },
  { href: '/dashboard/vehicles', label: 'Vehicles', icon: Briefcase, roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.READONLY] },
  { href: '/dashboard/work-orders', label: 'Work Orders', icon: FileText, roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.READONLY] },
  { href: '/dashboard/inventory', label: 'Inventory', icon: Package, roles: [ROLES.ADMIN, ROLES.MANAGER] },
  { href: '/dashboard/vendors', label: 'Vendors', icon: ShoppingCart, roles: [ROLES.ADMIN, ROLES.MANAGER] },
  { href: '/dashboard/fuel-logs', label: 'Fuel Logs', icon: Fuel, roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.READONLY] },
  { href: '/dashboard/activity-log', label: 'Activity Log', icon: Clipboard, roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.READONLY] },
  { href: '/dashboard/reports', label: 'Reports', icon: BarChart2, roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.READONLY] },
  { href: '/dashboard/documents', label: 'Documents', icon: FileText, roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.READONLY] },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings, roles: [ROLES.ADMIN] },
];

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    const { user } = useUser();

    const userRole = user?.role as keyof typeof ROLES || ROLES.READONLY;

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
              const isActive = (item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href));
              const linkClasses = `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${isCollapsed ? 'justify-center' : ''}
                ${isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                  : 'bg-slate-800/50 border border-white/10 shadow-md text-muted-foreground hover:bg-slate-700/70 hover:text-foreground hover:shadow-lg'}`;
              return (
                <Link key={item.href} href={item.href} className={linkClasses}>
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span className="flex-1">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </aside>
    );
};

export default Sidebar;
