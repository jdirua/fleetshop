import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import AlertList from "./alert-list";
  
  export function SmartAlertFeed() {
    return (
      <Card className="glass-card h-full">
        <CardHeader>
          <CardTitle>Smart Alert Feed</CardTitle>
          <CardDescription>
            A real-time list of critical system and vehicle alerts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertList />
        </CardContent>
      </Card>
    );
  }
  