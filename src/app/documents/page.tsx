import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DocumentsHub } from '@/components/documents-hub';
import { getDocuments } from '@/lib/actions/documents';
import { getVehicles } from '@/lib/actions/vehicles';
import { getWorkOrders } from '@/lib/actions/workOrders';
import { getAllUsers } from '@/lib/actions/users';

export default async function DocumentsPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session) {
        redirect('/');
    }

    const { documents, totalPages } = await getDocuments({ userId: session.value, page: 1, limit: 10 });
    const { data: vehicles } = await getVehicles({});
    const { data: workOrders } = await getWorkOrders({});
    const { users } = await getAllUsers();

    return (
        <DocumentsHub 
            initialDocuments={documents} 
            totalPages={totalPages} 
            currentPage={1} 
            vehicles={vehicles} 
            workOrders={workOrders} 
            users={users}
            userId={session.value}
        />
    );
}
