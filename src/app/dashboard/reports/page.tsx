
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

export default function ReportsPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      const [vehiclesData, workOrdersData, activityLogsData] = await Promise.all([
        getVehicles(),
        getWorkOrders(),
        getActivityLogs(),
      ]);
      setVehicles(vehiclesData);
      setWorkOrders(workOrdersData);
      setActivityLogs(activityLogsData);
    }
    fetchData();
  }, []);

  const exportToPdf = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current);
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <Button onClick={exportToPdf}>Export to PDF</Button>
      </div>
      <div ref={contentRef} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Status</CardTitle>
            </CardHeader>
            <CardContent>
              <VehicleStatusChart vehicles={vehicles} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Work Order Status</CardTitle>
            </CardHeader>
            <CardContent>
             <WorkOrderStatusChart workOrders={workOrders} />
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity activityLogs={activityLogs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
