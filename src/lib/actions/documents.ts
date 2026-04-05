'use server';

import { db, storage } from '@/lib/firebase/admin-sdk';
import { Document } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

export async function getDocumentsFor(relatedToType: string, relatedToId: string): Promise<Document[]> {
  try {
    const snapshot = await db.collection('documents')
      .where('relatedTo.type', '==', relatedToType)
      .where('relatedTo.id', '==', relatedToId)
      .get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Document[];
  } catch (error) {
    console.error('Error fetching documents for:', error);
    return [];
  }
}

export async function getDocuments({ userId, page = 1, limit = 10 }: { userId: string; page?: number; limit?: number }): Promise<{ documents: Document[], totalPages: number }> {
  if (!userId) {
    return { documents: [], totalPages: 0 };
  }
  try {
    const documentsRef = db.collection('documents').where('userId', '==', userId);
    
    const snapshot = await documentsRef.get();
    const totalDocuments = snapshot.size;
    const totalPages = Math.ceil(totalDocuments / limit);

    const docsSnapshot = await documentsRef
        .orderBy('uploadedAt', 'desc')
        .limit(limit)
        .offset((page - 1) * limit)
        .get();

    if (docsSnapshot.empty) {
        return { documents: [], totalPages };
    }

    const documents = docsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            uploadedAt: data.uploadedAt.toDate(),
        } as Document;
    });

    return { documents, totalPages };
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
}

export async function uploadDocument(
    userId: string, 
    name: string, 
    category: string, 
    file: File,
    relatedToType?: string,
    relatedToId?: string
): Promise<Document> {
    const fileId = uuidv4();
    const filePath = `documents/${userId}/${fileId}-${file.name}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const fileRef = storage.bucket().file(filePath);
    await fileRef.save(fileBuffer, {
        metadata: {
            contentType: file.type,
        },
    });

    const [url] = await fileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });

    const docRef = db.collection('documents').doc();
    const newDocument: Omit<Document, 'id'> = {
        userId,
        name,
        category,
        url,
        filePath,
        uploadedAt: new Date(),
        ...(relatedToType && relatedToId && { relatedTo: { type: relatedToType, id: relatedToId } })
    };

    await docRef.set(newDocument);

    return {
        id: docRef.id,
        ...newDocument
    };
}

export async function deleteDocument(documentId: string, filePath: string): Promise<void> {
    try {
        const docRef = db.collection('documents').doc(documentId);
        await docRef.delete();

        const fileRef = storage.bucket().file(filePath);
        await fileRef.delete();
    } catch (error) {
        console.error('Error deleting document:', error);
        throw new Error('Could not delete document.');
    }
}
