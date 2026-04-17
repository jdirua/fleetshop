'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Document } from '@/lib/types';
import { Vehicle } from '@/lib/types/vehicle';
import { WorkOrder } from '@/lib/types/workOrder';
import { User } from '@/lib/types/user';
import { Button } from '@/components/ui/button';
import UploadDocumentDialog from '@/components/upload-document-dialog';
import { PaginationControls } from '@/components/ui/PaginationControls';
import { File, Link2, PlusCircle, Car, Wrench, Users } from 'lucide-react';
import { format } from 'date-fns';
import { EmptyState } from '@/components/ui/empty-state';

interface DocumentsHubProps {
  initialDocuments: Document[];
  totalPages: number;
  currentPage: number;
  vehicles: Vehicle[];
  workOrders: WorkOrder[];
  users: User[];
  userId: string;
}

export function DocumentsHub({ 
  initialDocuments,
  totalPages,
  currentPage,
  vehicles,
  workOrders,
  users,
  userId
}: DocumentsHubProps) {
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  const router = useRouter();

  const handleUploadComplete = () => {
    setUploadDialogOpen(false);
    router.refresh();
  };

  const getRelatedItemName = (type: string, id: string) => {
    if (!type || !id) return 'N/A';
    switch (type) {
      case 'vehicle':
        return vehicles?.find(v => v.id === id)?.make || id;
      case 'workOrder':
        return workOrders?.find(w => w.id === id)?.title || id;
      case 'user':
        return users?.find(u => u.uid === id)?.email || id;
      default:
        return 'N/A';
    }
  };
  
  const handlePageChange = (page: number) => {
    router.push(`/dashboard/documents?page=${page}`);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg px-4 py-2 shadow-lg">Documents Hub</h1>
        <Button onClick={() => setUploadDialogOpen(true)} className="bg-purple-500 hover:bg-purple-600 text-white shadow-md transition-all hover:shadow-lg">
          <PlusCircle className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {initialDocuments.length === 0 ? (
        <EmptyState
          title="No Documents Found"
          description="Get started by uploading your first document."
          icon={<File className="h-12 w-12 text-purple-400" />}
          action={{
            text: "Add First Document",
            onClick: () => setUploadDialogOpen(true)
          }}
          features={{
            title: "With Documents Hub, you can:",
            items: [
              {
                icon: <Car className="mr-2 h-5 w-5 text-purple-400"/>,
                text: "Link to Vehicles"
              },
              {
                icon: <Wrench className="mr-2 h-5 w-5 text-purple-400"/>,
                text: "Link to Work Orders"
              },
              {
                icon: <Users className="mr-2 h-5 w-5 text-purple-400"/>,
                text: "Link to Users"
              }
            ]
          }}
        />
      ) : (
        <div className="p-6 rounded-lg bg-slate-800/5 backdrop-blur-lg border border-slate-300/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialDocuments.map(doc => (
              <div key={doc.id} className="p-4 flex flex-col justify-between bg-slate-800/5 backdrop-blur-lg border border-slate-300/20">
                <div>
                  <div className="flex items-start justify-between">
                     <h3 className="text-lg font-bold text-white">{doc.name}</h3>
                     <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                       <Link2 className="h-5 w-5"/>
                     </a>
                  </div>
                  <p className="text-sm text-gray-400">Category: {doc.category}</p>
                  {doc.relatedTo && (
                    <p className="text-sm text-gray-400">Related To: {getRelatedItemName(doc.relatedTo.type, doc.relatedTo.id)}</p>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-4">Uploaded: {format(new Date(doc.uploadedAt), 'PPP')}</p>
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

      <UploadDocumentDialog
        isOpen={isUploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUploadComplete={handleUploadComplete}
        vehicles={vehicles || []}
        workOrders={workOrders || []}
        users={users || []}
        userId={userId}
      />
    </div>
  );
}
