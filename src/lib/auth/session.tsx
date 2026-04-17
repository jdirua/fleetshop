'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/lib/types/user';

interface Session {
  user: User | null;
  isLoading: boolean;
}

const SessionContext = createContext<Session>({ user: null, isLoading: true });

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session>({ user: null, isLoading: true });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const { user } = await response.json();
          setSession({ user, isLoading: false });
        } else {
          setSession({ user: null, isLoading: false });
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
        setSession({ user: null, isLoading: false });
      }
    };

    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};