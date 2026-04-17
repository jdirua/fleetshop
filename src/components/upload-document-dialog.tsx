'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { uploadDocument } from '@/lib/actions/documents';
import { Vehicle } from '@/lib/types/vehicle';
import { WorkOrder } from '@/lib/types/workOrder';
import { User } from '@/lib/types/user';

const documentSchema = z.object({
  file: z.instanceof(File).refine(file => file.size > 0, 'File is required.'),
  category: z.string().min(1, 'Category is required.'),
  relatedTo: z.string().min(1, 'Please select a related item.'),
});

interface UploadDocumentDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  vehicles: Vehicle[];
  workOrders: WorkOrder[];
  users: User[];
  userId: string;
  onUploadComplete?: () => void;
}

export default function UploadDocumentDialog({ 
  isOpen, 
  onOpenChange, 
  vehicles, 
  workOrders, 
  users, 
  userId,
  onUploadComplete 
}: UploadDocumentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: { file: undefined, category: '', relatedTo: '' },
  });

  const onSubmit = async (values: z.infer<typeof documentSchema>) => {
    setIsSubmitting(true);
    const [type, id] = values.relatedTo.split('_');

    try {
      await uploadDocument(
        userId,
        values.file.name,
        values.category,
        values.file,
        type,
        id
      );
      onUploadComplete?.();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Error uploading document:', error);
      // Optionally, show a toast or error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>Select a file and associate it with a vehicle, work order, or user.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="file">File</label>
            <Input 
              id="file" 
              type="file" 
              onChange={e => {
                if (e.target.files && e.target.files.length > 0) {
                  form.setValue('file', e.target.files[0]);
                }
              }} 
            />
            {form.formState.errors.file && <p className="text-red-500 text-sm">{form.formState.errors.file.message}</p>}
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <Input id="category" placeholder="e.g., Invoice, Inspection Report" {...form.register('category')} />
            {form.formState.errors.category && <p className="text-red-500 text-sm">{form.formState.errors.category.message}</p>}
          </div>
          <div>
            <label htmlFor="relatedTo">Related To</label>
            <Select onValueChange={value => form.setValue('relatedTo', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map(v => <SelectItem key={v.id} value={`vehicle_${v.id}`}>{v.make} {v.model} ({v.registration})</SelectItem>)}
                {workOrders.map(w => <SelectItem key={w.id} value={`workOrder_${w.id}`}>{w.title}</SelectItem>)}
                {users.map(u => <SelectItem key={u.uid} value={`user_${u.uid}`}>{u.email}</SelectItem>)}
              </SelectContent>
            </Select>
            {form.formState.errors.relatedTo && <p className="text-red-500 text-sm">{form.formState.errors.relatedTo.message}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Uploading...' : 'Upload'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
