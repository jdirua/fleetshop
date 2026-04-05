'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorkOrder } from '@/lib/types/workOrder';
import { cn } from '@/lib/utils';

const priorityColors: { [key: string]: string } = {
  low: 'bg-blue-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
};

const statusColors: { [key: string]: string } = {
  'open': 'bg-green-500',
  'in-progress': 'bg-yellow-600',
  'on-hold': 'bg-gray-500',
  'completed': 'bg-blue-600',
  'cancelled': 'bg-red-600',
};

export function WorkOrderCard({ workOrder }: { workOrder: WorkOrder }) {
  return (
    <Link href={`/dashboard/work-orders/${workOrder.id}`} className="block transition-transform duration-200 ease-in-out hover:-translate-y-1">
      <Card className="h-full flex flex-col bg-slate-800/75 backdrop-blur-lg border border-slate-300/20">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold">{workOrder.title}</CardTitle>
              {workOrder.vehicle && (
                <CardDescription>{workOrder.vehicle.make} {workOrder.vehicle.model} ({workOrder.vehicle.year})</CardDescription>
              )}
            </div>
            <Badge className={cn("text-white", priorityColors[workOrder.priority?.toLowerCase() || 'low'])}>
              {workOrder.priority}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-end">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Status:</span>
            <Badge variant="outline" className={cn("text-white border-0", statusColors[workOrder.status?.toLowerCase() || 'open'])}>
              {workOrder.status}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
