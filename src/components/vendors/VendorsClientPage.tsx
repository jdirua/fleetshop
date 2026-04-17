'use client';

import { useRouter } from 'next/navigation';
import { Vendor } from '@/lib/types/vendor';
import { Button } from '@/components/ui/button';
import { CreateVendorDialog } from '@/components/vendors/CreateVendorDialog';
import { PaginationControls } from '@/components/ui/PaginationControls';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { hasPermission } from "@/lib/auth/roles";
import { useSession } from '@/lib/auth/session';

interface VendorsClientPageProps {
  initialVendors: Vendor[];
  totalPages: number;
  currentPage: number;
}

export default function VendorsClientPage({ 
  initialVendors,
  totalPages,
  currentPage 
}: VendorsClientPageProps) {
  const router = useRouter();
  const session = useSession();
  const userRole = session?.user?.role ?? 'viewer';

  const canCreate = hasPermission(userRole, 'create');
  const canUpdate = hasPermission(userRole, 'update');
  const canDelete = hasPermission(userRole, 'delete');

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/vendors?page=${page}`);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg px-4 py-2 shadow-lg">Vendors</h1>
        {canCreate && (
          <CreateVendorDialog asChild>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white shadow-md transition-all hover:shadow-lg">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Vendor
            </Button>
          </CreateVendorDialog>
        )}
      </div>

      {initialVendors.length === 0 ? (
        <EmptyState
          title="No Vendors Found"
          description="Get started by adding your first vendor."
          icon={<PlusCircle className="h-12 w-12 text-purple-400" />}
          action={canCreate ? {
            text: "Add First Vendor",
            onClick: () => { /* The dialog will be triggered by its trigger */ }
          } : undefined}
        />
      ) : (
        <div className="p-6 rounded-lg bg-slate-800/5 backdrop-blur-lg border border-slate-300/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialVendors.map(vendor => (
              <div key={vendor.id} className="p-4 flex flex-col justify-between bg-slate-800/5 backdrop-blur-lg border border-slate-300/20">
                <div>
                    <h3 className="text-lg font-bold text-white">{vendor.name}</h3>
                    <p className="text-sm text-gray-400">{vendor.contactName}</p>
                    <p className="text-sm text-gray-400">{vendor.contactEmail}</p>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  {canUpdate && <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>}
                  {canDelete && <Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
