
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadDocument, deleteDocument } from '@/lib/actions/documents';
import { Document } from '@/lib/types/document';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';

const UploadSchema = z.object({
  file: z.instanceof(FileList).refine(files => files?.length === 1, 'File is required.'),
});

interface DocumentManagerProps {
  relatedTo: string;
  initialDocuments: Document[];
}

export function DocumentManager({ relatedTo, initialDocuments }: DocumentManagerProps) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof UploadSchema>>({
    resolver: zodResolver(UploadSchema),
  });

  const onUpload: SubmitHandler<z.infer<typeof UploadSchema>> = async (data) => {
    const file = data.file[0];
    if (file) {
      const [collection, id] = relatedTo.split('/');
      const newDocument = await uploadDocument(file, { collection, id });
      setDocuments(prev => [...prev, newDocument]);
      reset();
    }
  };

  const handleDelete = async (documentId: string) => {
    const documentToDelete = documents.find(doc => doc.id === documentId);
    if (!documentToDelete) return;

    await deleteDocument(documentId);
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onUpload)} className="flex items-center gap-2">
          <Input type="file" {...register('file')} />
          <Button type="submit">Upload</Button>
          {errors.file && <p className="text-sm text-red-500">{errors.file.message}</p>}
        </form>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {doc.fileName}
                  </a>
                </TableCell>
                <TableCell>{doc.fileType}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(doc.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
