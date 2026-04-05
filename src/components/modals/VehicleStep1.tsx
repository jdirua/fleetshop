'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
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

export function VehicleStep1() {
  const { control } = useFormContext();

  const fields = ["registration", "vin", "make", "model", "year"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((fieldName, index) => (
        <MotionFormItem 
          key={fieldName} 
          custom={index}
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={fieldName === 'year' ? 'md:col-span-2' : ''}
        >
          <FormField
            control={control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor={fieldName} className="capitalize">{fieldName}</Label>
                <FormControl>
                  <Input 
                    id={fieldName} 
                    type={fieldName === 'year' ? 'number' : 'text'} 
                    {...field} 
                    onChange={fieldName === 'year' ? e => field.onChange(parseInt(e.target.value, 10)) : field.onChange}
                  />
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
