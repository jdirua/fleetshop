
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { VehicleForm } from '@/components/forms/VehicleForm';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// This is the page for creating a new vehicle.
// It uses a client component `VehicleForm` to handle the form submission.

export default function NewVehiclePage() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/vehicles">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Vehicles</span>
          </Link>
        </Button>
        <div>
            <h1 className="text-2xl font-bold">Add a New Vehicle</h1>
            <p className="text-muted-foreground">Fill out the form below to add a new vehicle to your fleet.</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Details</CardTitle>
          <CardDescription>Please provide the registration, make, model, and other relevant information.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading form...</div>}>
            <VehicleForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
