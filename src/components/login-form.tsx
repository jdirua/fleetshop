
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { FirebaseError } from 'firebase/app';

const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
  password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
});

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isResetDialogOpen, setResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetFeedback, setResetFeedback] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [, fields] = useForm({
    id: 'login-form',
    constraint: getZodConstraint(loginSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldRevalidate: 'onInput',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submission = parseWithZod(formData, { schema: loginSchema });

    if (submission.status !== 'success') {
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        submission.value.email,
        submission.value.password
      );
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create session');
      }

      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setFormError(error.message);
      } else {
        setFormError('An unknown error occurred.');
      }
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      setResetFeedback('Please enter your email address.');
      return;
    }
    setIsResetting(true);
    setResetFeedback('Sending request...');
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetFeedback('Request sent. If an account exists, a reset link has been sent.');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setResetFeedback(`An error occurred: ${error.message}. Please try again.`);
      } else {
        setResetFeedback('An unknown error occurred. Please try again.');
      }
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700 shadow-2xl shadow-purple-500/10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Sign In</CardTitle>
          <CardDescription className="text-slate-400 pt-2">Enter your credentials to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {formError && (
              <p className="text-red-400 text-sm font-semibold p-3 bg-red-500/10 rounded-md flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {formError}
              </p>
            )}
            <div>
              <Label htmlFor={fields.email.id}>Email</Label>
              <Input key={fields.email.key} name={fields.email.name} defaultValue={fields.email.initialValue} type="email" className="mt-1" />
              {fields.email.errors && <p className="text-red-400 text-sm mt-1"><AlertCircle className="inline w-4 h-4 mr-1" />{fields.email.errors[0]}</p>}
            </div>
            <div className="relative">
              <Label htmlFor={fields.password.id}>Password</Label>
              <Input key={fields.password.key} name={fields.password.name} defaultValue={fields.password.initialValue} type={showPassword ? 'text' : 'password'} className="mt-1" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-slate-400"><Eye size={20} /></button>
              {fields.password.errors && <p className="text-red-400 text-sm mt-1"><AlertCircle className="inline w-4 h-4 mr-1" />{fields.password.errors[0]}</p>}
            </div>
            <div className="flex items-center justify-between">
                <Dialog open={isResetDialogOpen} onOpenChange={setResetDialogOpen}>
                    <DialogTrigger asChild>
                        <button type="button" className="text-sm font-medium text-purple-400 hover:text-purple-300">Forgot your password?</button>
                    </DialogTrigger>
                    <DialogContent className="glassmorphic bg-slate-800 border-slate-700 text-white">
                        <DialogHeader>
                            <DialogTitle>Reset Password</DialogTitle>
                            <DialogDescription>Enter your email to receive a reset link.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Input id="reset-email" type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
                            {resetFeedback && <p className={`text-sm p-2 rounded-md ${resetFeedback.startsWith('An error') ? 'bg-red-900/50' : 'bg-green-900/50'}`}>{resetFeedback}</p>}
                        </div>
                        <DialogFooter>
                            <Button onClick={handlePasswordReset} disabled={isResetting} className="bg-purple-600 hover:bg-purple-700">
                                {isResetting ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <Button type="submit" className="w-full font-bold py-3 text-base">Sign In</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
