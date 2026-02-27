
'use server';

import { db, storage } from '@/lib/firebase/admin-sdk';
import { logActivity } from './activityLogs';
import { Document } from '@/lib/types/document';

export async function getDocumentsFor(collection: string, id: string): Promise<Document[]> {
    try {
        const snapshot = await db.collection(collection).doc(id).collection('documents').get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Document));
    } catch (error) {
        console.error('Error fetching documents:', error);
        throw new Error('Could not fetch documents.');
    }
}

export async function uploadDocument(file: File, relatedTo: { collection: string, id: string }): Promise<Document> {
    try {
        const { collection, id } = relatedTo;
        const filePath = `${collection}/${id}/${file.name}`;
        const fileRef = storage.bucket().file(filePath);

        const fileBuffer = Buffer.from(await file.arrayBuffer());

        await fileRef.save(fileBuffer, {
            metadata: {
                contentType: file.type,
            },
        });

        const [fileUrl] = await fileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });

        const docRef = await db.collection(collection).doc(id).collection('documents').add({
            fileName: file.name,
            fileType: file.type,
            filePath,
            fileUrl,
            createdAt: new Date().toISOString(),
        });

        await logActivity('upload', { type: 'document', id: docRef.id });

        return { 
            id: docRef.id, 
            fileName: file.name, 
            fileType: file.type, 
            filePath, 
            fileUrl, 
            createdAt: new Date().toISOString() 
        } as Document;
    } catch (error) {
        console.error('Error uploading document:', error);
        throw new Error('Could not upload document.');
    }
}

export async function deleteDocument(vendorId: string, documentId: string, filePath: string) {
    try {
        // Delete file from storage
        await storage.bucket().file(filePath).delete();

        // Delete document from firestore
        await db.collection('vendors').doc(vendorId).collection('documents').doc(documentId).delete();

        await logActivity('delete', { type: 'document', id: documentId });

    } catch (error) {
        console.error('Error deleting document:', error);
        throw new Error('Could not delete document.');
    }
}
