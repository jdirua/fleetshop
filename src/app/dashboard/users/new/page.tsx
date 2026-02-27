'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createUser } from '@/lib/actions/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROLES, UserRole } from '@/lib/auth/roles';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(Object.values(ROLES) as [UserRole, ...UserRole[]]),
});

type UserFormData = z.infer<typeof userSchema>;

export default function NewUserPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
        role: ROLES.MECHANIC,
    }
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      await createUser({
        name: data.name,
        email: data.email,
        role: data.role,
        createdAt: new Date().toISOString(),
      });
      router.push('/dashboard/users');
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Add New User</CardTitle>
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
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" {...register('password')} />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
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
              <Button type="submit">Add User</Button>
            </form>
        </CardContent>
    </Card>
  );
}
