'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { WorkOrder } from '@/lib/types/workOrder';
import { useUser } from '@/context/UserContext';
import { hasPermission } from '@/lib/auth/roles';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlusCircle, Wrench, ClipboardList, User } from 'lucide-react';
import { WorkOrderCard } from '../WorkOrderCard';
import { PaginationControls } from '@/components/ui/PaginationControls';
import { CreateWorkOrderDialog } from '@/components/work-orders/CreateWorkOrderDialog';

export function WorkOrdersClientPage({ initialWorkOrders, totalPages }: { initialWorkOrders: WorkOrder[], totalPages: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useUser();
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const page = Number(searchParams.get('page')) || 1;
    const canCreate = user && hasPermission(user.role, 'manage_work_orders');

    const handleSuccess = () => {
        setCreateModalOpen(false);
        router.refresh();
    };

    const handlePageChange = (newPage: number) => {
        router.push(`/dashboard/work-orders?page=${newPage}`);
    };

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <CreateWorkOrderDialog isOpen={isCreateModalOpen} onOpenChange={setCreateModalOpen} onSuccess={handleSuccess} />
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Work Order Hub</h2>
                {canCreate && (
                    <Button onClick={() => setCreateModalOpen(true)} className="bg-purple-500 hover:bg-purple-600 text-white">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Work Order
                    </Button>
                )}
            </div>

            {initialWorkOrders.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {initialWorkOrders.map((workOrder) => (
                            <WorkOrderCard key={workOrder.id} workOrder={workOrder} />
                        ))}
                    </div>
                    <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                </>
            ) : (
                <EmptyState onAddClick={() => setCreateModalOpen(true)} canCreate={canCreate} />
            )}
        </div>
    );
}

const EmptyState = ({ onAddClick, canCreate }: { onAddClick: () => void, canCreate: boolean | undefined }) => (
    <Card className="min-h-[70vh] flex items-center justify-center text-center bg-slate-800/75 backdrop-blur-lg border border-slate-300/20">
        <div className="flex flex-col items-center justify-center p-6">
            
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-pulse-slow"></div>
              <Wrench className="h-16 w-16 text-purple-400" />
            </div>

            <h3 className="mt-8 text-3xl font-bold">No Work Orders Found</h3>
            <p className='mt-2 max-w-sm text-lg text-muted-foreground'>
                Get started by creating your first work order.
            </p>
            
            {canCreate && (
                <Button onClick={onAddClick} className="mt-8 py-6 px-8 text-lg card-lift bg-purple-500 hover:bg-purple-600 text-white">
                      <PlusCircle className="mr-3 h-5 w-5" />
                      Add First Work Order
                </Button>
            )}

            <div className='mt-12 w-full max-w-2xl'>
              <p className='text-sm uppercase text-muted-foreground font-semibold tracking-wider'>Once you add a work order, you&apos;ll be able to:</p>
              <div className='mt-4 grid grid-cols-3 gap-4 text-left'>
                  <div className='rounded-lg p-4 flex items-center space-x-3 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20'>
                      <ClipboardList className='h-6 w-6 text-purple-400' />
                      <span className='font-medium'>Track Parts & Labor</span>
                  </div>
                  <div className='rounded-lg p-4 flex items-center space-x-3 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20'>
                      <User className='h-6 w-6 text-purple-400' />
                      <span className='font-medium'>Assign Technicians</span>
                  </div>
                  <div className='rounded-lg p-4 flex items-center space-x-3 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20'>
                      <Wrench className='h-6 w-6 text-purple-400' />
                      <span className='font-medium'>Update Status</span>
                  </div>
              </div>
            </div>

        </div>
    </Card>
);
