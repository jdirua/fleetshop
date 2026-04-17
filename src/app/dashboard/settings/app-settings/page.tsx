'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadCloud } from 'lucide-react';

export default function AppSettingsPage() {
  const [featureFlags, setFeatureFlags] = useState({
    vendors: true,
    fuelLogs: true,
    maintenance: true,
    reporting: true,
  });

  const [companyPrefs, setCompanyPrefs] = useState({
    currency: 'PGK', // Default to Papua New Guinean Kina
    measurementUnit: 'Imperial',
    logo: null as File | null,
  });

  const handleFeatureToggle = (feature: keyof typeof featureFlags) => {
    setFeatureFlags(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  const handlePrefChange = (id: string, value: string) => {
    setCompanyPrefs(prev => ({ ...prev, [id]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCompanyPrefs(prev => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card-deep">
        <CardHeader>
          <CardTitle>Feature Management</CardTitle>
          <CardDescription>Toggle major application features on or off for all users.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.keys(featureFlags).map(feature => (
            <div key={feature} className="flex items-center justify-between p-3 rounded-md bg-slate-900/50">
              <Label htmlFor={feature} className="capitalize text-base">{feature.replace(/([A-Z])/g, ' $1')}</Label>
              <Switch
                id={feature}
                checked={featureFlags[feature as keyof typeof featureFlags]}
                onCheckedChange={() => handleFeatureToggle(feature as keyof typeof featureFlags)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-card-deep">
        <CardHeader>
          <CardTitle>Company Preferences</CardTitle>
          <CardDescription>Set company-wide preferences for currency, units, and branding.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
                <Select value={companyPrefs.currency} onValueChange={(value) => handlePrefChange('currency', value)}>
                    <SelectTrigger className="bg-slate-900/50 border-slate-700">
                        <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="PGK">PGK - Papua New Guinean Kina</SelectItem>
                        <SelectItem value="USD">USD - United States Dollar</SelectItem>
                        <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="measurementUnit">Measurement Units</Label>
                <Select value={companyPrefs.measurementUnit} onValueChange={(value) => handlePrefChange('measurementUnit', value)}>
                    <SelectTrigger className="bg-slate-900/50 border-slate-700">
                        <SelectValue placeholder="Select measurement unit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Imperial">Imperial</SelectItem>
                        <SelectItem value="Metric">Metric</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Company Logo</Label>
            <div className="flex items-center justify-center w-full">
                <Label htmlFor="logo-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-700 border-dashed rounded-lg cursor-pointer bg-slate-900/50 hover:bg-slate-800/50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-3 text-slate-400" />
                        <p className="mb-2 text-sm text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <Input id="logo-upload" type="file" className="hidden" onChange={handleLogoChange} />
                </Label>
            </div> 
            {companyPrefs.logo && <p className='text-sm text-slate-300 mt-2'>File selected: {companyPrefs.logo.name}</p>}
          </div>
        </CardContent>
      </Card>
       <div className="flex justify-end">
            <Button>Save Changes</Button>
        </div>
    </div>
  );
}
