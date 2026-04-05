export interface Document {
    id: string;
    name: string;
    category: string;
    url: string;
    filePath: string;
    uploadedAt: Date;
    userId: string;
    relatedTo?: {
        type: string;
        id: string;
    };
}
