import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DocumentsHub } from '@/components/documents-hub';

export default async function DocumentsPage() {
    const cookieStore = cookies();
    const session = cookieStore.get('session');

    if (!session) {
        redirect('/');
    }

    const { user } = JSON.parse(session.value);

    if (!user) {
        redirect('/');
    }

    return (
        <main>
            <DocumentsHub userId={user.uid} />
        </main>
    );
}
