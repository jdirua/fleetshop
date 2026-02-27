'use client';

import { useFormState } from 'react-dom';
import { signInWithEmail } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialState = {
  error: '',
};

export function LoginForm() {
  const [state, formAction] = useFormState(signInWithEmail, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" required />
      </div>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      <Button type="submit" className="w-full">Sign In</Button>
    </form>
  );
}
