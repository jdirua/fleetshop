
import { getCurrentUser } from '@/lib/auth/server';
import { redirect } from 'next/navigation';
import { DocumentsHub } from '@/components/documents-hub';
import { getDocuments } from '@/lib/actions/documents';
import { getVehicles } from '@/lib/actions/vehicles';
import { getAllUsers } from '@/lib/actions/users';
import { getWorkOrders } from '@/lib/actions/workOrders';

export default async function DocumentsPage({ searchParams }: { searchParams: { page?: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/login');
  }

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const limit = 10;
  const { documents, totalPages } = await getDocuments({ userId: user.uid, page, limit });
  const { data: vehicles } = await getVehicles({ page: 1, limit: 1000 });
  const { users } = await getAllUsers();
  const { data: workOrders } = await getWorkOrders({ page: 1, limit: 1000 });


  return (
    <DocumentsHub
      initialDocuments={documents}
      totalPages={totalPages}
      currentPage={page}
      vehicles={vehicles}
      workOrders={workOrders}
      users={users}
      userId={user.uid}
    />
  );
}
