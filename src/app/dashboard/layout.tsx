import { redirect } from 'next/navigation';
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { getCurrentUser } from '@/lib/auth/server';
import { UserProvider } from '@/context/UserContext';
import { ReactNode } from 'react';

export default async function DashboardLayout({ 
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <UserProvider user={user}>
      <div className="flex h-screen text-foreground gravel">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
