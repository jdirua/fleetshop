
import {
  Users,
  SlidersHorizontal,
  ToggleLeft,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const settingsSections = [
  {
    title: "User Management",
    description: "Create users, assign roles, and manage permissions.",
    icon: Users,
    href: "/dashboard/settings/users",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-400",
  },
  {
    title: "Operational Configuration",
    description:
      "Set alert thresholds, maintenance types, and asset categories.",
    icon: SlidersHorizontal,
    href: "/dashboard/settings/operational",
    iconBg: "bg-gradient-to-br from-yellow-500 to-orange-400",
  },
  {
    title: "Application Settings",
    description: "Manage feature flags, company profile, and localization.",
    icon: ToggleLeft,
    href: "/dashboard/settings/app-settings",
    iconBg: "bg-gradient-to-br from-purple-500 to-violet-400",
  },
  {
    title: "System & Security",
    description: "View audit logs, manage data exports, and run diagnostics.",
    icon: ShieldCheck,
    href: "/dashboard/settings/security",
    iconBg: "bg-gradient-to-br from-red-500 to-pink-400",
  },
];

interface SettingCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  iconBg: string;
}

const SettingCard = ({
  title,
  description,
  icon: Icon,
  href,
  iconBg,
}: SettingCardProps) => (
  <Link href={href} className="group block">
    <Card className="h-full transition-all duration-300 ease-in-out group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:border-primary/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-6">
          <div
            className={cn(
              "flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl shadow-md transition-all duration-300 ease-in-out group-hover:shadow-lg",
              iconBg
            )}
          >
            <Icon className="h-8 w-8 text-white/90" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-50 transition-colors group-hover:text-white">
              {title}
            </h3>
            <p className="mt-1 text-base text-slate-400 transition-colors group-hover:text-slate-300">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg px-4 py-2 shadow-lg">Settings Hub</h1>
      </div>
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {settingsSections.map((section) => (
              <SettingCard key={section.title} {...section} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
