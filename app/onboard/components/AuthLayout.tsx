import React from 'react';
import { TrendingUp } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <div className="p-4">
        <a href="/" className="flex items-center space-x-2 text-blue-600 font-semibold text-xl">
          <TrendingUp className="h-6 w-6" />
          <span>FinaTalk</span>
        </a>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-sm border border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-600 mb-8">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}