'use client';

import { useRouter } from 'next/navigation';
import { ActivityLog } from "@/lib/types/activityLog";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { Card } from "@/components/ui/card";
import { FileClock, User, Settings, Truck, Car, Wrench, Package, Building, Fuel } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityLogClientPageProps {
  activityLogs: ActivityLog[];
  totalPages: number;
  currentPage: number;
}

const getLogIcon = (targetType: string) => {
    const iconClass = "h-5 w-5 text-purple-400";
    switch (targetType) {
        case 'user': return <User className={iconClass} />;
        case 'setting': return <Settings className={iconClass} />;
        case 'vehicle': return <Car className={iconClass} />;
        case 'work-order': return <Wrench className={iconClass} />;
        case 'inventory': return <Package className={iconClass} />;
        case 'vendor': return <Building className={iconClass} />;
        case 'fuel-log': return <Fuel className={iconClass} />;
        default: return <Truck className={iconClass} />;
    }
};

export default function ActivityLogClientPage({ activityLogs = [], totalPages, currentPage }: ActivityLogClientPageProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/activity-log?page=${page}`);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg px-4 py-2 shadow-lg">Activity Log Hub</h1>
      </div>

      {activityLogs.length === 0 ? (
        <EmptyState />
      ) : (
        <Card className="p-4 sm:p-6 md:p-8">
          <div className="relative border-l-2 border-slate-700/50 ml-6 space-y-10">
            {activityLogs.map((log) => (
              <div key={log.id} className="relative pl-10">
                <div className="absolute -left-4 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 ring-4 ring-slate-900/50">
                  {getLogIcon(log.target.type)}
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <p className="font-semibold text-slate-50">
                    <span className="font-bold text-primary">{log.user?.displayName || 'System'}</span>
                    <span className="text-slate-300"> {log.action.replace(/-/g, ' ')} </span>
                    <span className="font-medium text-slate-400">{log.target.type}:</span>
                    <span className="text-slate-300"> {log.target.id}</span>
                  </p>
                  <time className="mt-1 text-xs text-slate-500 md:mt-0">
                    {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                  </time>
                </div>
                {log.details && (
                  <p className="mt-1 text-sm text-slate-400">{log.details}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <PaginationControls 
              totalPages={totalPages} 
              currentPage={currentPage} 
              onPageChange={handlePageChange} 
            />
          </div>
        </Card>
      )}
    </div>
  );
}

const EmptyState = () => (
    <Card className="glass-card min-h-[70vh] flex flex-col items-center text-center p-6">
        <div className="flex-grow flex flex-col items-center justify-center">
            <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-pulse-slow"></div>
                <FileClock className="h-16 w-16 text-purple-400" />
            </div>
            <h3 className="mt-8 text-3xl font-bold text-slate-50 text-shadow">No Recent Activity</h3>
            <p className='mt-2 text-lg text-slate-400 text-center'>
                When activities are logged, they will appear here.
            </p>
        </div>
        <div className='w-full max-w-2xl'>
            <p className='text-sm uppercase text-slate-500 font-semibold tracking-wider text-center'>THE ACTIVITY LOG MONITORS:</p>
            <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-6'>
                <Card className='glass-card p-6 flex flex-col items-center justify-center gap-4'>
                    <User className='h-8 w-8 text-purple-400' />
                    <span className='font-medium text-slate-200'>User Actions</span>
                </Card>
                <Card className='glass-card p-6 flex flex-col items-center justify-center gap-4'>
                    <Settings className='h-8 w-8 text-purple-400' />
                    <span className='font-medium text-slate-200'>System Events</span>
                </Card>
                <Card className='glass-card p-6 flex flex-col items-center justify-center gap-4'>
                    <Truck className='h-8 w-8 text-purple-400' />
                    <span className='font-medium text-slate-200'>Fleet Updates</span>
                </Card>
            </div>
        </div>
    </Card>
  );
