'use client';

import { Vendor } from "@/lib/types/vendor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Mail, Phone, User } from "lucide-react";

export function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Card className="glassmorphic card-lift">
      <CardHeader>
        <div className="flex items-start justify-between">
            <CardTitle className="text-xl font-bold flex items-center"><Building className="mr-3 h-6 w-6 text-muted-foreground"/>{vendor.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {vendor.contactName && (
            <div className="flex items-center">
                <User className="h-5 w-5 mr-3 text-muted-foreground" />
                <div className="flex flex-col">
                    <span className="text-muted-foreground">Contact Name</span>
                    <span className="font-semibold">{vendor.contactName}</span>
                </div>
            </div>
        )}
         {vendor.contactEmail && (
            <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                <div className="flex flex-col">
                    <span className="text-muted-foreground">Email</span>
                    <a href={`mailto:${vendor.contactEmail}`} className="font-semibold text-blue-400 hover:underline">{vendor.contactEmail}</a>
                </div>
            </div>
        )}
        {vendor.contactPhone && (
            <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                <div className="flex flex-col">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-semibold">{vendor.contactPhone}</span>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
