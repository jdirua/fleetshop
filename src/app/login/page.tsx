'use client';

import { LoginForm } from '@/components/login-form';
import { UserProvider } from '@/context/UserContext';

export default function LoginPage() {
  return (
    <UserProvider user={null}>
      <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
        <div className="w-full max-w-md rounded-2xl shadow-2xl bg-slate-800/75 backdrop-blur-lg border border-slate-300/20">
          <div className="p-8 relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">Sign In</h1>
              <p className="text-base text-gray-300 mt-2">
                Enter your email below to login to your account
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
