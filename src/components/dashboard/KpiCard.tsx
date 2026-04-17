import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: number | string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  description: string;
  iconClassName?: string;
}

export function KpiCard({ title, value, icon: Icon, description, iconClassName }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-8 w-8 text-muted-foreground", iconClassName)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
