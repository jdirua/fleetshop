'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { hasPermission } from '@/lib/auth/roles';
import { Vendor } from '@/lib/types/vendor';
import { Button } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import { VendorCard } from "@/components/vendors/VendorCard";
import { PlusCircle, Building, Truck, FileText, AreaChart } from 'lucide-react';
import { CreateVendorDialog } from '@/components/vendors/CreateVendorDialog';
import { PaginationControls } from '@/components/ui/PaginationControls';

// Main Vendors Page Component
export function VendorsClientPage({ initialVendors, totalPages }: { initialVendors: Vendor[], totalPages: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useUser();
    
    const page = Number(searchParams.get('page')) || 1;
    const canCreate = user && user.role && hasPermission(user.role, 'vendors:create');

    const handlePageChange = (newPage: number) => {
      router.push(`/dashboard/vendors?page=${newPage}`);
    };

    const handleSuccess = () => {
        router.refresh();
    };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Vendors Hub</h2>
        {canCreate && (
          <CreateVendorDialog onSuccess={handleSuccess} asChild>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Vendor
            </Button>
          </CreateVendorDialog>
        )}
      </div>

      {initialVendors.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {initialVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
          <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      ) : (
        <EmptyState canCreate={canCreate} onSuccess={handleSuccess} />
      )}
    </div>
  );
}

// Empty State Component
const EmptyState = ({ canCreate, onSuccess }: { canCreate: boolean | undefined, onSuccess: () => void }) => (
    <Card className="glassmorphic min-h-[70vh] flex items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center p-6">
            <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-pulse-slow"></div>
                <Building className="h-16 w-16 text-purple-400" />
            </div>

            <h3 className="mt-8 text-3xl font-bold">No Vendors Found</h3>
            <p className='mt-2 max-w-sm text-lg text-muted-foreground'>
                Get started by adding your first vendor to the directory.
            </p>
            
            {canCreate && (
              <CreateVendorDialog onSuccess={onSuccess} asChild>
                <Button className="mt-8 py-6 px-8 text-lg card-lift bg-purple-500 hover:bg-purple-600 text-white">
                      <PlusCircle className="mr-3 h-5 w-5" />
                      Add First Vendor
                </Button>
              </CreateVendorDialog>
            )}

            <div className='mt-12 w-full max-w-3xl'>
              <p className='text-sm uppercase text-muted-foreground font-semibold tracking-wider'>Once you add a vendor, you&apos;ll be able to:</p>
              <div className='mt-4 grid grid-cols-3 gap-4 text-left'>
                  <div className='glassmorphic rounded-lg p-4 flex items-center space-x-3'>
                      <Truck className='h-6 w-6 text-purple-400' />
                      <span className='font-medium'>Manage Suppliers</span>
                  </div>
                  <div className='glassmorphic rounded-lg p-4 flex items-center space-x-3'>
                      <FileText className='h-6 w-6 text-purple-400' />
                      <span className='font-medium'>Track Purchase Orders</span>
                  </div>
                  <div className='glassmorphic rounded-lg p-4 flex items-center space-x-3'>
                      <AreaChart className='h-6 w-6 text-purple-400' />
                      <span className='font-medium'>Analyze Spending</span>
                  </div>
              </div>
            </div>
        </div>
    </Card>
  );
