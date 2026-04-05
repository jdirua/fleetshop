"use client"

import { Bell } from 'lucide-react';

const alerts = [
  { id: 1, message: 'Vehicle A-123: Engine temperature is high', time: '2m ago' },
  { id: 2, message: 'Part #P-456: Stock is low (5 remaining)', time: '1h ago' },
  { id: 3, message: 'Vehicle C-789: Maintenance overdue by 10 days', time: '3h ago' },
];

export default function AlertList() {
  return (
    <ul className="space-y-4">
      {alerts.map(alert => (
        <li key={alert.id} className="flex items-start">
          <div className="flex-shrink-0">
            <Bell className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{alert.message}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{alert.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
