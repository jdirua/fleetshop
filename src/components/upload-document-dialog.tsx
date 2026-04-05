'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { uploadDocument } from '@/lib/actions/documents';
import { Vehicle, WorkOrder, User } from '@/lib/types';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const UploadSchema = z.object({
  name: z.string().min(1, 'Document name is required'),
  category: z.string().min(1, 'Category is required'),
  file: z
    .instanceof(FileList)
    .refine(files => files?.length === 1, 'File is required.')
    .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
  relatedTo: z.string().optional(),
});

interface UploadDocumentDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onUploadComplete: () => void;
    vehicles: Vehicle[];
    workOrders: WorkOrder[];
    users: User[];
    userId: string;
}

export function UploadDocumentDialog({ 
    isOpen, 
    setIsOpen, 
    onUploadComplete, 
    vehicles, 
    workOrders, 
    users, 
    userId 
}: UploadDocumentDialogProps) {
    const [isUploading, setIsUploading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<z.infer<typeof UploadSchema>>({
        resolver: zodResolver(UploadSchema),
    });

    const onSubmit: SubmitHandler<z.infer<typeof UploadSchema>> = async (data) => {
        setIsUploading(true);
        const file = data.file[0];
        try {
            const [relatedType, relatedId] = data.relatedTo?.split('_') || [];

            await uploadDocument(userId, data.name, data.category, file, relatedType, relatedId);
            onUploadComplete();
            reset();
            setIsOpen(false);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload a New Document</DialogTitle>
                    <DialogDescription>
                        Fill in the details below and select a file to upload. Max file size: 5MB.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Document Name</Label>
                        <Input id="name" {...register('name')} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" {...register('category')} />
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="relatedTo">Link to</Label>
                        <Select onValueChange={(value) => setValue('relatedTo', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="(Optional) Link to vehicle, work order, etc." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                {vehicles.map(v => <SelectItem key={v.id} value={`vehicle_${v.id}`}>{v.make} {v.model}</SelectItem>)}
                                {workOrders.map(w => <SelectItem key={w.id} value={`workOrder_${w.id}`}>{w.title}</SelectItem>)}
                                {users.map(u => <SelectItem key={u.id} value={`user_${u.id}`}>{u.email}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="file">File</Label>
                        <Input id="file" type="file" {...register('file')} />
                        {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isUploading}>
                            {isUploading ? 'Uploading...' : 'Upload'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
