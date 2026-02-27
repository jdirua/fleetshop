'use client';

import { useEffect, useState } from 'react';
import { getUserById } from '@/lib/actions/users';
import { User } from '@/lib/types/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const fetchedUser = await getUserById(params.id);
        setUser(fetchedUser);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
      setLoading(false);
    }
    loadUser();
  }, [params.id]);

  if (loading) {
    return (
        <Card>
            <CardHeader>
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
            </CardContent>
        </Card>
    );
  }

  if (!user) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
            <p className="font-semibold">Name:</p>
            <p>{user.name}</p>
        </div>
        <div>
            <p className="font-semibold">Email:</p>
            <p>{user.email}</p>
        </div>
        <div>
            <p className="font-semibold">Role:</p>
            <p>{user.role}</p>
        </div>
      </CardContent>
    </Card>
  );
}
