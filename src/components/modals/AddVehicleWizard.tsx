'use client';

import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormState } from 'react-dom';

import { createVehicle, VehicleFormState } from '@/lib/actions/vehicles';
import { VehicleSchema } from '@/lib/schemas/vehicle';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { VehicleStep1 } from './VehicleStep1';
import { VehicleStep2 } from './VehicleStep2';
import { VehicleStep3 } from './VehicleStep3';

const steps = [
  { id: 1, title: 'Core Details', fields: ['registration', 'vin', 'make', 'model', 'year'] },
  { id: 2, title: 'Status & Maintenance', fields: ['status', 'currentOdometer', 'serviceDate'] },
  { id: 3, title: 'Assignment & Notes', fields: ['assignedDriverId', 'notes'] },
];

const initialState: VehicleFormState = {
    message: null,
    errors: undefined,
    vehicleId: undefined,
};

interface AddVehicleWizardProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess?: () => void;
}

export function AddVehicleWizard({ isOpen, onOpenChange, onSuccess }: AddVehicleWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, formAction] = useFormState(createVehicle, initialState);

  const methods = useForm<z.infer<typeof VehicleSchema>>({
    resolver: zodResolver(VehicleSchema),
    mode: 'onChange', 
  });

  useEffect(() => {
      if (state.message?.includes('successfully')) {
          onSuccess?.();
          onOpenChange(false);
          methods.reset();
          setCurrentStep(0);
      }
  }, [state, onSuccess, onOpenChange, methods]);

  const nextStep = async () => {
    const fields = steps[currentStep].fields as (keyof z.infer<typeof VehicleSchema>)[];
    const isValid = await methods.trigger(fields);
    if (isValid) {
        setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="glass-card sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Add a New Vehicle</DialogTitle>
                <DialogDescription>
                    Follow the steps to add a new vehicle to your fleet.
                </DialogDescription>
            </DialogHeader>

            {/* Modern Progress Indicator */}
            <div className="my-6">
                <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Step {currentStep + 1} of {steps.length}</p>
                    <p className="text-sm font-semibold">{steps[currentStep].title}</p>
                </div>
                <Progress value={((currentStep + 1) / steps.length) * 100} />
            </div>

            <FormProvider {...methods}>
                <form action={formAction} className="space-y-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentStep === 0 && <VehicleStep1 />}
                            {currentStep === 1 && <VehicleStep2 />}
                            {currentStep === 2 && <VehicleStep3 />}
                        </motion.div>
                    </AnimatePresence>

                    <DialogFooter className="mt-8">
                        <div className="w-full flex justify-between">
                            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                                Back
                            </Button>
                            
                            {currentStep < steps.length - 1 ? (
                                <Button type="button" onClick={nextStep} className="btn-primary-glow">
                                    Next
                                </Button>
                            ) : (
                                <Button type="submit" className="btn-primary-glow">
                                    Finish
                                </Button>
                            )}
                        </div>
                    </DialogFooter>
                </form>
            </FormProvider>
            
            {state.errors?._form && (
                <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4">
                    <p className="text-sm font-medium text-red-600">{state.errors._form.join(', ')}</p>
                </div>
            )}
        </DialogContent>
    </Dialog>
  );
}
