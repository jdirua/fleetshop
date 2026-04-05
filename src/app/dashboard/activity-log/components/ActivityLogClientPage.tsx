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

export default function ActivityLogClientPage({ activityLogs, totalPages, currentPage }: ActivityLogClientPageProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/activity-log?page=${page}`);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Activity Log Hub</h2>
      </div>

      {activityLogs.length === 0 ? (
        <EmptyState />
      ) : (
        <Card className="p-4 sm:p-6 md:p-8 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20">
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
    <Card className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20">
        <div className="relative w-28 h-28 flex items-center justify-center">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-pulse-slow"></div>
            <FileClock className="h-16 w-16 text-purple-400" />
        </div>
        <h3 className="mt-8 text-3xl font-bold">No Recent Activity</h3>
        <p className='mt-2 max-w-sm text-lg text-muted-foreground'>
            When activities are logged, they will appear here.
        </p>
        <div className='mt-12 w-full max-w-2xl'>
            <p className='text-sm uppercase text-muted-foreground font-semibold tracking-wider'>THE ACTIVITY LOG MONITORS:</p>
            <div className='mt-4 grid grid-cols-3 gap-4 text-left'>
                <div className='rounded-lg p-4 flex items-center space-x-3 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20'>
                    <User className='h-6 w-6 text-purple-400' />
                    <span className='font-medium'>User Actions</span>
                </div>
                <div className='rounded-lg p-4 flex items-center space-x-3 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20'>
                    <Settings className='h-6 w-6 text-purple-400' />
                    <span className='font-medium'>System Events</span>
                </div>
                <div className='rounded-lg p-4 flex items-center space-x-3 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20'>
                    <Truck className='h-6 w-6 text-purple-400' />
                    <span className='font-medium'>Fleet Updates</span>
                </div>
            </div>
        </div>
    </Card>
  );
