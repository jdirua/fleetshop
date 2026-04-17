
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LiveAssetMapWrapper from "@/components/dashboard/LiveAssetMapWrapper";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { SmartAlertFeed } from "@/components/dashboard/smart-alert-feed";
import OrderStatusChart from "@/components/dashboard/order-status-chart";
import { PredictiveMaintenanceForecast } from "@/components/dashboard/predictive-maintenance-forecast";
import { PartsConsumptionGauge } from "@/components/dashboard/parts-consumption-gauge";
import { PageHeader, PageHeaderTitle, PageHeaderDescription } from "@/components/page-header";
import ServiceBacklogChart from "@/components/dashboard/service-backlog-chart";
import { CheckCircle, Truck, Wrench, XCircle, Timer } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4">
      <PageHeader>
        <div className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 rounded-lg shadow-lg">
          <PageHeaderTitle className="text-white">Dashboard</PageHeaderTitle>
          <PageHeaderDescription className="text-white">
            An overview of your fleet&apos;s operations and performance.
          </PageHeaderDescription>
        </div>
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          title="Total Vehicles"
          value="24"
          icon={Truck}
          description="+2.5% from last month"
          iconClassName="text-blue-500"
        />
        <KpiCard
          title="Operational"
          value="18"
          icon={CheckCircle}
          description="-5.1% from last week"
          iconClassName="text-green-500"
        />
        <KpiCard
          title="Maintenance"
          value="4"
          icon={Wrench}
          description="+10% from last week"
          iconClassName="text-yellow-500"
        />
        <KpiCard
          title="Out of Service"
          value="2"
          icon={XCircle}
          description="+1 from yesterday"
          iconClassName="text-red-500"
        />
        <KpiCard
            title="Vehicles Awaiting Service"
            value="3"
            icon={Timer}
            description="From PM schedule"
            iconClassName="text-orange-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Live Asset Map</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <LiveAssetMapWrapper />
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Work Order Status</CardTitle>
                    <CardDescription>
                      A summary of open and recently closed work orders.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OrderStatusChart />
                  </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Predictive Maintenance Forecast</CardTitle>
                        <CardDescription>Anticipated service needs for the next 6 months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PredictiveMaintenanceForecast />
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Service Backlog by Group</CardTitle>
                        <CardDescription>Awaiting service by operational group.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ServiceBacklogChart />
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Parts Consumption</CardTitle>
                        <CardDescription>Critical parts usage this cycle.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PartsConsumptionGauge />
                    </CardContent>
                </Card>
            </div>
        </div>

        <div className="lg:col-span-1">
            <SmartAlertFeed />
        </div>
      </div>
    </div>
  );
}
