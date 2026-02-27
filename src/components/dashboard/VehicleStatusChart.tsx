import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function VehicleStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Status Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Chart will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
