
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/client';
import { User } from 'firebase/auth';
import { UserRole } from '@/lib/auth/roles';

interface UserDetails extends User {
  role: UserRole | null;
}

export function useUser() {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        try {
            const idTokenResult = await userAuth.getIdTokenResult();
            const userRole = (idTokenResult.claims.role as UserRole) || null;
            
            setUser({ ...userAuth, role: userRole });

        } catch(e) {
            console.error("Error getting user token:", e);
            setUser({ ...userAuth, role: null });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
