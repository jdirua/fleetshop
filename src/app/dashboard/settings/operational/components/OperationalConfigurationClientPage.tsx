'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2 } from 'lucide-react';
import { 
    updateLowInventoryThreshold,
    addServiceType,
    deleteServiceType,
    addPartCategory,
    deletePartCategory
} from '@/lib/actions/operational-config';

interface OperationalConfigurationClientPageProps {
  initialData: {
    lowInventoryThreshold: number;
    serviceTypes: string[];
    partCategories: string[];
  };
}

export function OperationalConfigurationClientPage({ initialData }: OperationalConfigurationClientPageProps) {
  const [lowInventoryThreshold, setLowInventoryThreshold] = useState(initialData.lowInventoryThreshold || 10);
  const [serviceTypes, setServiceTypes] = useState(initialData.serviceTypes || []);
  const [partCategories, setPartCategories] = useState(initialData.partCategories || []);
  
  const [newServiceType, setNewServiceType] = useState('');
  const [newPartCategory, setNewPartCategory] = useState('');

  const handleThresholdSave = async () => {
    const result = await updateLowInventoryThreshold(lowInventoryThreshold);
    if (result.error) {
        toast.error(result.error);
    } else {
        toast.success(result.message);
    }
  };

  const handleAddServiceType = async () => {
    if (!newServiceType.trim()) return;
    const result = await addServiceType(newServiceType);
    if (result.error) {
        toast.error(result.error);
    } else {
        toast.success(result.message);
        setServiceTypes(prev => [...prev, newServiceType]);
        setNewServiceType('');
    }
  };

  const handleDeleteServiceType = async (serviceType: string) => {
    const result = await deleteServiceType(serviceType);
    if (result.error) {
        toast.error(result.error);
    } else {
        toast.success(result.message);
        setServiceTypes(prev => prev.filter(st => st !== serviceType));
    }
  };

  const handleAddPartCategory = async () => {
    if (!newPartCategory.trim()) return;
    const result = await addPartCategory(newPartCategory);
    if (result.error) {
        toast.error(result.error);
    } else {
        toast.success(result.message);
        setPartCategories(prev => [...prev, newPartCategory]);
        setNewPartCategory('');
    }
  };

  const handleDeletePartCategory = async (category: string) => {
    const result = await deletePartCategory(category);
    if (result.error) {
        toast.error(result.error);
    } else {
        toast.success(result.message);
        setPartCategories(prev => prev.filter(pc => pc !== category));
    }
  };

  return (
    <div className="space-y-6">
      <Card className='glass-card-deep'>
        <CardHeader>
          <CardTitle>Alert Thresholds</CardTitle>
          <CardDescription>Set the warning threshold for low inventory items.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Label htmlFor="low-inventory-threshold" className="whitespace-nowrap">Low Inventory Warning:</Label>
            <Input
              id="low-inventory-threshold"
              type="number"
              value={lowInventoryThreshold}
              onChange={(e) => setLowInventoryThreshold(Number(e.target.value))}
              className="w-32 bg-slate-900/50 border-slate-700"
            />
            <Button onClick={handleThresholdSave}>Save</Button>
          </div>
        </CardContent>
      </Card>

      <Card className='glass-card-deep'>
        <CardHeader>
          <CardTitle>Service Types</CardTitle>
          <CardDescription>Manage predefined service types for work orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            {serviceTypes.map((type, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">{type}</span>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteServiceType(type)}>
                    <Trash2 className="h-4 w-4 text-red-500 hover:text-red-400" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2 mt-4">
              <Input
                  type="text"
                  value={newServiceType}
                  onChange={(e) => setNewServiceType(e.target.value)}
                  placeholder="Add new service type"
                  className="bg-slate-900/50 border-slate-700"
              />
              <Button onClick={handleAddServiceType}><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>
          </div>
        </CardContent>
      </Card>

      <Card className='glass-card-deep'>
        <CardHeader>
            <CardTitle>Part Categories</CardTitle>
            <CardDescription>Manage categories for inventory parts.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-2 mb-4">
                {partCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-slate-300">{category}</span>
                        <Button variant="ghost" size="icon" onClick={() => handleDeletePartCategory(category)}>
                            <Trash2 className="h-4 w-4 text-red-500 hover:text-red-400" />
                        </Button>
                    </div>
                ))}
            </div>
            <div className="flex items-center space-x-2 mt-4">
                <Input
                    type="text"
                    value={newPartCategory}
                    onChange={(e) => setNewPartCategory(e.target.value)}
                    placeholder="Add new part category"
                    className="bg-slate-900/50 border-slate-700"
                />
                <Button onClick={handleAddPartCategory}><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
