import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function OperationalSettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Link href="/dashboard/settings" className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-white tracking-tight">Operational Configuration</h1>
            </div>
        </div>

        <div className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg px-4 py-3 shadow-lg">
            <p className="text-white">Finetune business logic and set custom categories.</p>
        </div>
        
        <div className="glass-card p-6">
          {children}
        </div>
    </div>
  );
}
