'use client';

import { useState } from 'react';
import { Document, Vehicle, WorkOrder, User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { PaginationControls } from '@/components/ui/PaginationControls';
import { File, Link2, PlusCircle, Car, Wrench, Users } from 'lucide-react';
import { format } from 'date-fns';

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

  const handleUploadComplete = () => {
    setUploadDialogOpen(false);
  };

  const getRelatedItemName = (type: string, id: string) => {
    if (!type || !id) return 'N/A';
    switch (type) {
      case 'vehicle':
        return vehicles.find(v => v.id === id)?.make || id;
      case 'workOrder':
        return workOrders.find(w => w.id === id)?.title || id;
      case 'user':
        return users.find(u => u.id === id)?.email || id;
      default:
        return 'N/A';
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg px-4 py-2 shadow-lg">Documents Hub</h1>
        <Button onClick={() => setUploadDialogOpen(true)} className="bg-purple-500 hover:bg-purple-600 text-white shadow-md transition-all hover:shadow-lg">
          <PlusCircle className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {initialDocuments.length === 0 ? (
        <div className="text-center p-10 rounded-lg bg-slate-800/5 backdrop-blur-lg border border-slate-300/20">
            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-purple-500/20 mb-6">
                <File className="h-12 w-12 text-purple-400" />
            </div>
          <h2 className="mt-6 text-2xl font-semibold text-white">No Documents Found</h2>
          <p className="mt-2 text-sm text-gray-400">Get started by uploading your first document.</p>
          <Button onClick={() => setUploadDialogOpen(true)} className="mt-6 bg-purple-500 hover:bg-purple-600 text-white">
             <PlusCircle className="mr-2 h-4 w-4" />
            Add First Document
          </Button>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-lg bg-slate-800/5 backdrop-blur-lg border border-slate-300/20"> 
              <h3 className="font-semibold text-white flex items-center"><Car className="mr-2 h-5 w-5 text-purple-400"/>Link to Vehicles</h3>
              <p className="text-sm text-gray-400 mt-1">Attach registration, insurance, and inspection papers directly to vehicles.</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/5 backdrop-blur-lg border border-slate-300/20">
              <h3 className="font-semibold text-white flex items-center"><Wrench className="mr-2 h-5 w-5 text-purple-400"/>Link to Work Orders</h3>
              <p className="text-sm text-gray-400 mt-1">Keep invoices, receipts, and service reports organized with work orders.</p>
            </div>
             <div className="p-4 rounded-lg bg-slate-800/5 backdrop-blur-lg border border-slate-300/20">
              <h3 className="font-semibold text-white flex items-center"><Users className="mr-2 h-5 w-5 text-purple-400"/>Link to Users</h3>
              <p className="text-sm text-gray-400 mt-1">Store employee contracts, licenses, and certifications securely.</p>
            </div>
          </div>
        </div>
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
              basePath="/dashboard/documents"
            />
          </div>
        </div>
      )}

      <UploadDocumentDialog
        isOpen={isUploadDialogOpen}
        setIsOpen={setUploadDialogOpen}
        onUploadComplete={handleUploadComplete}
        vehicles={vehicles}
        workOrders={workOrders}
        users={users}
        userId={userId}
      />
    </div>
  );
}
