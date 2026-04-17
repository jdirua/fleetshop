import { Bell, Wrench, Package, Triangle } from 'lucide-react';

const alerts = [
  {
    id: 1,
    icon: Package,
    title: 'Part #P-456: Stock is low (5 remaining)',
    time: '1h ago',
    iconColor: 'text-yellow-400',
  },
  {
    id: 2,
    icon: Wrench,
    title: 'Vehicle C-789: Maintenance overdue by 10 days',
    time: '3h ago',
    iconColor: 'text-red-500',
  },
  {
    id: 3,
    icon: Wrench,
    title: 'Vehicle B-456: Service due in 5 days',
    time: '1d ago',
    iconColor: 'text-orange-400',
  },
  {
    id: 4,
    icon: Triangle,
    title: 'Vehicle A-123: Engine temperature exceeding limits',
    time: '2d ago',
    iconColor: 'text-red-500',
  },
  {
    id: 5,
    icon: Bell,
    title: 'System update available',
    time: '3d ago',
    iconColor: 'text-blue-400',
  },
  {
    id: 6,
    icon: Package,
    title: 'Part #Q-789: Stock is critically low (1 remaining)',
    time: '4d ago',
    iconColor: 'text-red-500',
  },
    {
    id: 7,
    icon: Wrench,
    title: 'Vehicle D-101: Service due in 2 days',
    time: '5d ago',
    iconColor: 'text-orange-400',
    },
];

const AlertList = () => {
  return (
    <ul className="space-y-3">
      {alerts.map((alert) => (
        <li key={alert.id} className="flex items-start p-3 bg-card/80 rounded-lg shadow-sm hover:bg-muted transition-colors duration-200 ease-in-out">
          <div className="flex-shrink-0 mr-3">
            <alert.icon className={`h-5 w-5 ${alert.iconColor}`} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{alert.title}</p>
            <p className="text-xs text-muted-foreground">{alert.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AlertList;
