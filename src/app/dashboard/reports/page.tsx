
'use client';

import { useEffect, useState, useRef } from 'react';
import { getVehicles } from '@/lib/actions/vehicles';
import { getWorkOrders } from '@/lib/actions/workOrders';
import { getActivityLogs } from '@/lib/actions/activityLogs';
import { Vehicle } from '@/lib/types/vehicle';
import { WorkOrder } from '@/lib/types/workOrder';
import { ActivityLog } from '@/lib/types/activityLog';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { VehicleStatusChart } from '@/components/reports/VehicleStatusChart';
import { WorkOrderStatusChart } from '@/components/reports/WorkOrderStatusChart';
import { RecentActivity } from '@/components/reports/RecentActivity';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Wrench, History } from 'lucide-react';

export default function ReportsPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      const [vehiclesResponse, workOrdersResponse, activityLogsResponse] = await Promise.all([
        getVehicles(),
        getWorkOrders(),
        getActivityLogs(),
      ]);

      if (vehiclesResponse.data && Array.isArray(vehiclesResponse.data)) {
        setVehicles(vehiclesResponse.data);
      }

      if (workOrdersResponse.data && Array.isArray(workOrdersResponse.data)) {
        setWorkOrders(workOrdersResponse.data);
      }

      if (activityLogsResponse.data && Array.isArray(activityLogsResponse.data)) {
        setActivityLogs(activityLogsResponse.data);
      }
    }
    fetchData();
  }, []);

  const exportToPdf = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current, { backgroundColor: '#1E293B' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('fleet-report.pdf');
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg px-4 py-2 shadow-lg">Reports and Analytics Hub</h1>
        <Button onClick={exportToPdf} className="bg-purple-500 text-white hover:bg-purple-600">Export to PDF</Button>
      </div>
      <div ref={contentRef} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Vehicle Status</CardTitle>
              <Truck className="h-6 w-6 text-purple-400" />
            </CardHeader>
            <CardContent>
              <VehicleStatusChart vehicles={vehicles} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Work Order Status</CardTitle>
              <Wrench className="h-6 w-6 text-purple-400" />
            </CardHeader>
            <CardContent>
             <WorkOrderStatusChart workOrders={workOrders} />
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <History className="h-6 w-6 text-purple-400" />
          </CardHeader>
          <CardContent>
            <RecentActivity activityLogs={activityLogs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
