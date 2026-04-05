'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

export function VehicleStep2() {
  const { control } = useFormContext();

  const fields = ["status", "currentOdometer", "serviceDate"];

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
          className={fieldName === 'serviceDate' ? 'md:col-span-2' : ''}
        >
          <FormField
            control={control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor={fieldName} className="capitalize">{fieldName.replace(/([A-Z])/g, ' $1')}</Label>
                <FormControl>
                  {fieldName === 'status' ? (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent className="solid-dropdown">
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="in-shop">In Shop</SelectItem>
                        <SelectItem value="decommissioned">Decommissioned</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input 
                      id={fieldName} 
                      type={fieldName === 'currentOdometer' ? 'number' : 'date'} 
                      {...field} 
                      onChange={fieldName === 'currentOdometer' ? e => field.onChange(parseInt(e.target.value, 10)) : field.onChange}
                    />
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
