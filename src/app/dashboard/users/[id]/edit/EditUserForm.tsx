'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/lib/types/user";
import { updateUser } from "@/lib/actions/users";
import { ROLES } from "@/lib/auth/roles";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters." }),
  role: z.enum(ROLES),
});

export default function EditUserForm({ user }: { user: User }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: user.displayName || "",
      role: user.role,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await updateUser(user.uid, values);
    if (result.success) {
      toast.success("User updated successfully!");
      router.push("/dashboard/settings/users");
    } else {
      toast.error(result.error || "Failed to update user.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input value={user.email ?? ''} disabled />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}
