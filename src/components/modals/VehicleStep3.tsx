'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const MotionFormItem = motion(FormItem);

const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3
    }
  })
};

export function VehicleStep3() {
  const { control } = useFormContext();

  const fields = ["assignedDriverId", "notes"];

  return (
    <div className="grid grid-cols-1 gap-6">
      {fields.map((fieldName, index) => (
        <MotionFormItem 
          key={fieldName} 
          custom={index}
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <FormField
            control={control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor={fieldName} className="capitalize">{fieldName.replace(/([A-Z])/g, ' $1')}</Label>
                <FormControl>
                  {fieldName === 'notes' ? (
                    <Textarea id="notes" {...field} />
                  ) : (
                    <Input id="assignedDriverId" {...field} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </MotionFormItem>
      ))}
    </div>
  );
}
