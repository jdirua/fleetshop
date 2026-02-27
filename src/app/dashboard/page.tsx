import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getDashboardData } from "@/lib/actions/dashboard";
import { Car, Wrench, Package, Users, Fuel, ShieldCheck, Settings, AlertTriangle } from 'lucide-react';
import Link from "next/link";

export default async function DashboardPage() {
  let totalVehicles = 0;
  let activeWorkOrders = 0;
  let lowStockItems = 0;
  let overdueServices = 0;
  let error = null;

  try {
    const data = await getDashboardData();
    totalVehicles = data.totalVehicles;
    activeWorkOrders = data.activeWorkOrders;
    lowStockItems = data.lowStockItems;
    overdueServices = data.overdueServices;
    error = data.error;
  } catch (e) {
    console.error(e);
    error = "Failed to fetch dashboard data. Please check your Firebase credentials and try again.";
  }

  const kpis = [
    { name: "Total Vehicles", value: totalVehicles, icon: Car, href: "/dashboard/vehicles" },
    { name: "Active Work Orders", value: activeWorkOrders, icon: Wrench, href: "/dashboard/work-orders" },
    { name: "Low Stock Items", value: lowStockItems, icon: Package, href: "/dashboard/inventory" },
    { name: "Overdue Services", value: overdueServices, icon: AlertTriangle, href: "/dashboard/vehicles" },
  ];

  const features = [
    { name: "Fuel Management", icon: Fuel, href: "/dashboard/fuel-management" },
    { name: "Compliance", icon: ShieldCheck, href: "/dashboard/compliance" },
    { name: "Users", icon: Users, href: "/dashboard/users" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  const recentActivities = [
    { id: 1, description: "Vehicle VV-001 service completed." },
    { id: 2, description: "New user 'John Doe' added." },
    { id: 3, description: "Fuel log for VV-002 updated." },
  ];

  return (
    <div className="space-y-6">
      {error && (
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800">An Error Occurred</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Link href={kpi.href} key={kpi.name}>
            <Card className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
                <kpi.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {features.map((feature) => (
              <Link href={feature.href} key={feature.name} className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
                <span className="font-medium">{feature.name}</span>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.description}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
