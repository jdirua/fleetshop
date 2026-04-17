'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { hasPermission } from '@/lib/auth/roles';
import { InventoryItem } from '@/lib/types/inventory';
import { Button } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import { InventoryCard } from "@/components/inventory/InventoryCard";
import { PlusCircle, Package, Box, Truck, Tag } from 'lucide-react';
import { PaginationControls } from '@/components/ui/PaginationControls';
import Link from 'next/link';

// Main Inventory Page Component
export function InventoryClientPage({ initialInventory, totalPages }: { initialInventory: InventoryItem[], totalPages: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useUser();
    
    const page = Number(searchParams.get('page')) || 1;
    const canCreate = !!(user && user.role && hasPermission(user.role, 'inventory:create'));

    const handlePageChange = (newPage: number) => {
      router.push(`/dashboard/inventory?page=${newPage}`);
    };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Inventory Hub</h2>
        {canCreate && (
            <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white">
                <Link href="/dashboard/inventory/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Item
                </Link>
            </Button>
        )}
      </div>

      {initialInventory.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {initialInventory.map((item) => (
              <InventoryCard key={item.id} item={item} />
            ))}
          </div>
          <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      ) : (
        <EmptyState canCreate={canCreate} />
      )}
    </div>
  );
}

// Empty State Component
const EmptyState = ({ canCreate }: { canCreate: boolean | undefined }) => (
    <Card className="min-h-[70vh] flex items-center justify-center text-center bg-slate-800/75 backdrop-blur-lg border border-slate-300/20">
        <div className="flex flex-col items-center justify-center p-6">
            <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-pulse-slow"></div>
                <Package className="h-16 w-16 text-purple-400" />
            </div>

            <h3 className="mt-8 text-3xl font-bold">No Inventory Items</h3>
            <p className='mt-2 max-w-sm text-lg text-muted-foreground'>
                Get started by adding your first inventory item.
            </p>
            
            {canCreate && (
                <Button asChild className="mt-8 py-6 px-8 text-lg card-lift bg-purple-500 hover:bg-purple-600 text-white">
                    <Link href="/dashboard/inventory/new">
                        <PlusCircle className="mr-3 h-5 w-5" />
                        Add First Item
                    </Link>
                </Button>
            )}

            <div className='mt-12 w-full max-w-3xl'>
              <p className='text-sm uppercase text-muted-foreground font-semibold tracking-wider'>Once you add an item, you&apos;ll be able to:</p>
              <div className='mt-4 grid grid-cols-3 gap-4 text-left'>
                  <div className='rounded-lg p-4 flex items-center space-x-3 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20'>
                      <Box className='h-6 w-6 text-purple-400' />
                      <span className='font-medium'>Track Stock Levels</span>
                  </div>
                  <div className='rounded-lg p-4 flex items-center space-x-3 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20'>
                      <Truck className='h-6 w-6 text-purple-400' />
                      <span className='font-medium'>Manage Suppliers</span>
                  </div>
                  <div className='rounded-lg p-4 flex items-center space-x-3 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20'>
                      <Tag className='h-6 w-6 text-purple-400' />
                      <span className='font-medium'>Categorize Parts</span>
                  </div>
              </div>
            </div>
        </div>
    </Card>
  );
