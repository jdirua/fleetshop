import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import { UserProvider } from '@/context/UserContext';
import { getCurrentUser } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <UserProvider displayName={user.displayName} email={user.email} role={user.role}>
      <div className="flex min-h-screen bg-secondary">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-8 gravel">
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
