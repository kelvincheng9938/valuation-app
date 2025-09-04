'use client';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-sm w-full bg-white/5 border border-white/10 rounded-xl p-6 text-center">
        <h1 className="text-xl font-semibold mb-3">Login Required</h1>
        <p className="text-sm text-white/70 mb-6">Please sign in with Google to view reports.</p>
        <button
          onClick={() => signIn('google', { callbackUrl: '/report' })}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
