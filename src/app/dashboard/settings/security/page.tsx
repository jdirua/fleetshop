import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const auditLogData = [
  { user: 'admin@fleet.com', action: 'Created Vehicle' },
  { user: 'editor@fleet.com', action: 'Updated Work Order' },
  { user: 'admin@fleet.com', action: 'Disabled User' },
  { user: 'system', action: 'Low inventory warning' },
  { user: 'admin@fleet.com', action: 'Added new vendor' },
];

export default function SystemSecurityPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Audit Log</CardTitle>
          <CardDescription>An unfiltered firehose of all major system and user activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogData.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Export</CardTitle>
          <CardDescription>Download a complete snapshot of your company data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
            Export All Data (.zip)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
