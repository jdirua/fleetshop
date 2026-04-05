
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8">
        <div className="flex items-center gap-4">
            <Link href="/dashboard/settings" className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
                <ArrowLeft className="w-5 h-5" />
            </Link>
            {/* The PageTitle component from each specific page will render its title here, creating a dynamic header within this consistent layout. */}
        </div>
        <div>
            {children}
        </div>
    </div>
  );
}
