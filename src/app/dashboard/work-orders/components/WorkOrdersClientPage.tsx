'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { WorkOrder } from '@/lib/types/workOrder';
import { useUser } from '@/context/UserContext';
import { hasPermission } from '@/lib/auth/roles';
import { Button } from '@/components/ui/button';
import { PlusCircle, Wrench, ClipboardList, User } from 'lucide-react';
import { WorkOrderCard } from '../WorkOrderCard';
import { PaginationControls } from '@/components/ui/PaginationControls';
import { CreateWorkOrderDialog } from '@/components/work-orders/CreateWorkOrderDialog';
import { EmptyState } from '@/components/ui/empty-state';

export function WorkOrdersClientPage({ initialWorkOrders, totalPages }: { initialWorkOrders: WorkOrder[], totalPages: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useUser();
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const page = Number(searchParams.get('page')) || 1;
    const canCreate = user && user.role && hasPermission(user.role, 'manage_work_orders');

    const handlePageChange = (newPage: number) => {
        router.push(`/dashboard/work-orders?page=${newPage}`);
    };

    return (
        <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg px-4 py-2 shadow-lg">Work Order Hub</h1>
                {canCreate && (
                    <CreateWorkOrderDialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen} asChild>
                        <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Work Order
                        </Button>
                    </CreateWorkOrderDialog>
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
                <EmptyState
                    title="No Work Orders Found"
                    description="Get started by creating your first work order."
                    icon={<Wrench className="h-16 w-16 text-purple-400" />}
                    action={canCreate ? { text: "Add First Work Order", onClick: () => setCreateModalOpen(true) } : undefined}
                    features={{
                        title: "Once you add a work order, you'll be able to:",
                        items: [
                            {
                                icon: <ClipboardList className='h-6 w-6 text-purple-400' />,
                                text: "Track Parts & Labor"
                            },
                            {
                                icon: <User className='h-6 w-6 text-purple-400' />,
                                text: "Assign Technicians"
                            },
                            {
                                icon: <Wrench className='h-6 w-6 text-purple-400' />,
                                text: "Update Status"
                            }
                        ]
                    }}
                />
            )}
        </div>
    );
}
