'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { Truck, Wrench, Package, AlertCircle, TrendingUp, Zap, MapPin } from 'lucide-react';
import { WorkOrderStatusChart } from "@/components/charts/WorkOrderStatusChart";
import { PredictiveMaintenanceChart } from "@/components/charts/PredictiveMaintenanceChart";
import { CriticalPartsChart } from "@/components/charts/CriticalPartsChart";

const kpiData = [
  { title: 'Total Fleet Size', value: '158', icon: Truck, color: 'text-cyan-400', change: '+2 since last month' },
  { title: 'Active Work Orders', value: '32', icon: Wrench, color: 'text-amber-400', change: '-5 since last week' },
  { title: 'Critical Parts', value: '8', icon: Package, color: 'text-rose-400', change: '2 new alerts' },
  { title: 'Fleet Utilization', value: '82%', icon: TrendingUp, color: 'text-emerald-400', change: '+3% since last month' },
];

const smartAlertFeedData = [
  { message: 'Vehicle #102: Engine temperature critical', level: 'critical', icon: AlertCircle },
  { message: 'Generator #3: Fuel levels at 15%', level: 'warning', icon: Zap },
  { message: 'Truck #88: Service due in 3 days', level: 'info', icon: Wrench },
  { message: 'Van #45 has entered a restricted zone', level: 'warning', icon: MapPin },
  { message: 'Vehicle #23: Tire pressure low', level: 'critical', icon: AlertCircle },
];

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <>
      <div className="mb-8 [text-shadow:0_1px_0_rgb(0_0_0_/_50%)]">
        <h1 className="text-3xl font-bold text-slate-50">Welcome back, {user?.displayName || 'User'}!</h1>
        <p className="text-slate-50/80">Here&apos;s a snapshot of your fleet&apos;s performance.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="col-span-12 xl:col-span-9 space-y-8">
          {/* KPI Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi) => (
              <Card key={kpi.title} className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-4xl font-bold ${kpi.color}`}>{kpi.value}</div>
                  <p className="text-xs text-slate-50/70 mt-1">{kpi.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Live Asset Map + Work Order Status */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <Card className="h-[400px] glass-card">
                <CardHeader>
                  <CardTitle>Live Asset Map</CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-4rem)] flex items-center justify-center">
                  <p className="text-slate-50/70">Live Asset Map has been temporarily disabled.</p>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card className="h-[400px] glass-card">
                <CardHeader>
                  <CardTitle>Work Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <WorkOrderStatusChart />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Secondary Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Predictive Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <PredictiveMaintenanceChart />
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Critical Parts Consumption</CardTitle>
              </CardHeader>
              <CardContent>
                <CriticalPartsChart />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Smart Alert Feed */}
        <div className="col-span-12 xl:col-span-3">
          <Card className="h-full glass-card">
            <CardHeader>
              <CardTitle>Smart Alert Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {smartAlertFeedData.map((alert, index) => (
                  <Card key={index} className="glass-card">
                    <div className="flex items-center gap-4 p-3">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                        alert.level === 'critical' ? 'bg-rose-500/20 text-rose-400' :
                        alert.level === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        <alert.icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm text-slate-50">{alert.message}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
