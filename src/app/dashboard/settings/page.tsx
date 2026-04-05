
import { PageTitle } from "@/components/page-title";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, SlidersHorizontal, ToggleLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

const settingsSections = [
  {
    title: "User Management",
    description: "Create users, assign roles, and manage permissions.",
    icon: Users,
    href: "/dashboard/settings/users",
    color: "text-blue-500",
  },
  {
    title: "Operational Configuration",
    description: "Set alert thresholds, maintenance types, and asset categories.",
    icon: SlidersHorizontal,
    href: "/dashboard/settings/operational",
    color: "text-yellow-500",
  },
  {
    title: "Application Settings",
    description: "Manage feature flags, company profile, and localization.",
    icon: ToggleLeft,
    href: "/dashboard/settings/app-settings",
    color: "text-purple-500",
  },
  {
    title: "System & Security",
    description: "View audit logs, manage data exports, and run diagnostics.",
    icon: ShieldCheck,
    href: "/dashboard/settings/security",
    color: "text-red-500",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageTitle title="Settings Hub" description="The administrative command center for your application." />
      <div className="glassmorphic p-8 rounded-lg">
        <div className="grid gap-6 md:grid-cols-2">
          {settingsSections.map((section) => (
            <Link href={section.href} key={section.title} className="block hover:scale-105 transform transition-transform duration-200">
              <Card className="bg-slate-800/50 h-full flex flex-col justify-between p-4">
                <CardHeader className="flex flex-row items-start gap-4 p-0">
                  <div className={`rounded-lg p-3 bg-gray-900/50`}>
                    <section.icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">{section.title}</CardTitle>
                    <CardDescription className="text-sm mt-1">{section.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
