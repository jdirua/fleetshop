import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Recent activity feed will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
