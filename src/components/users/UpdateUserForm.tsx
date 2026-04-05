'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ROLES, UserRole } from '@/lib/auth/roles';
import { User } from '@/lib/types/user';
import { updateUser } from '@/lib/actions/users';
import { toast } from 'sonner';

const rolesArray = Object.values(ROLES) as [UserRole, ...UserRole[]];

const UpdateUserSchema = z.object({
  displayName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  role: z.enum(rolesArray),
});

interface UpdateUserFormProps {
  user: User;
}

export function UpdateUserForm({ user }: UpdateUserFormProps) {
  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      displayName: user.displayName || '',
      role: user.role,
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateUserSchema>) => {
    try {
      await updateUser(user.uid, data);
      toast.success('User updated successfully');
    } catch {
      toast.error('Failed to update user');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rolesArray.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
