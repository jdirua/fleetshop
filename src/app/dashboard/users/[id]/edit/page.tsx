'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateUser, getUserById } from '@/lib/actions/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { User } from '@/lib/types/user';
import { notFound } from 'next/navigation';
import { ROLES, UserRole } from '@/lib/auth/roles';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(Object.values(ROLES) as [UserRole, ...UserRole[]]),
});

type UserFormData = z.infer<typeof userSchema>;

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const fetchedUser = await getUserById(params.id);
        setUser(fetchedUser);
        reset(fetchedUser);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setError('Failed to load user data. Please try again later.');
      }
      setLoading(false);
    }
    loadUser();
  }, [params.id, reset]);

  const onSubmit = async (data: UserFormData) => {
    if (!user) return;
    try {
      await updateUser(user.id, data);
      router.push('/dashboard/users');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  if (loading) {
    return (
        <Card>
            <CardHeader>
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
            </CardContent>
        </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
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
            <CardTitle>Edit User</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" {...register('name')} />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register('email')} />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="role">Role</Label>
                        <Select onValueChange={(value) => setValue('role', value as UserRole)} defaultValue={getValues('role')}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(ROLES).map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
              <Button type="submit">Save Changes</Button>
            </form>
        </CardContent>
    </Card>
  );
}
