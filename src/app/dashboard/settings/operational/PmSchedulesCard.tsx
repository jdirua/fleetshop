'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wrench } from "lucide-react";

export function PmSchedulesCard() {
  return (
    <Card className="glass-card-deep">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center"><Wrench className="mr-2"/>Preventative Maintenance (PM) Schedules</CardTitle>
            <CardDescription className="mt-2">Define maintenance schedules based on service intervals.</CardDescription>
          </div>
          <Button className="bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Schedule
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* This area will display a list of existing PM schedules */}
        <div className="flex items-center justify-center h-24 border-2 border-dashed border-slate-700 rounded-lg bg-slate-900/40">
            <p className="text-slate-400">No PM schedules defined yet.</p>
        </div>
      </CardContent>
    </Card>
  );
}
