'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Truck, Wrench, Package, Users, BarChart2, FileText, Settings, ChevronLeft, Fuel, ClipboardList } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { UserRole } from '@/lib/auth/roles';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'manager', 'mechanic', 'readonly'] },
  { href: '/dashboard/vehicles', label: 'Vehicles', icon: Truck, roles: ['admin', 'manager', 'mechanic', 'readonly'] },
  { href: '/dashboard/work-orders', label: 'Work Orders', icon: Wrench, roles: ['admin', 'manager', 'mechanic'] },
  { href: '/dashboard/inventory', label: 'Inventory', icon: Package, roles: ['admin', 'manager'] },
  { href: '/dashboard/vendors', label: 'Vendors', icon: Users, roles: ['admin', 'manager'] },
  { href: '/dashboard/fuel-logs', label: 'Fuel Logs', icon: Fuel, roles: ['admin', 'manager', 'mechanic'] },
  { href: '/dashboard/activity-log', label: 'Activity Log', icon: ClipboardList, roles: ['admin', 'manager'] },
  { href: '/dashboard/reports', label: 'Reports', icon: BarChart2, roles: ['admin', 'manager'] },
  { href: '/dashboard/documents', label: 'Documents', icon: FileText, roles: ['admin', 'manager', 'mechanic'] },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings, roles: ['admin'] },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, loading } = useUser();

  if (loading) {
    return (
      <aside className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          {!isCollapsed && <h2 className="text-xl font-bold">FLEETSHOP</h2>}
        </div>
        <div className="flex-1 p-4 space-y-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-9 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
          ))}
        </div>
      </aside>
    );
  }

  const filteredNavItems = navItems.filter(item => item.roles.includes(user?.role as UserRole));

  return (
    <aside className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        {!isCollapsed && <h2 className="text-xl font-bold">FLEETSHOP</h2>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <ChevronLeft className={`h-6 w-6 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {filteredNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === item.href
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <item.icon className="h-5 w-5" />
            {!isCollapsed && item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
