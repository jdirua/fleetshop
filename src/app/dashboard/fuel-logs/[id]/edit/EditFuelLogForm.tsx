'use client';

import { useFormState } from 'react-dom';
import { FuelLogForm } from '@/components/forms/FuelLogForm';
import { updateFuelLog } from '@/lib/actions/fuelLogs';
import { Button } from '@/components/ui/button';
import { Vehicle } from '@/lib/types/vehicle';
import { FuelLog } from '@/lib/types/fuelLog';
import { FuelLogFormState } from '@/lib/actions/fuelLogs';

interface EditFuelLogFormProps {
  fuelLog: FuelLog;
  vehicles: Vehicle[];
}

export default function EditFuelLogForm({ fuelLog, vehicles }: EditFuelLogFormProps) {
  const initialState: FuelLogFormState = { message: null, errors: {} };
  const updateFuelLogWithId = updateFuelLog.bind(null, fuelLog.id);
  const [state, dispatch] = useFormState(updateFuelLogWithId, initialState);

  return (
    <form action={dispatch}>
      <FuelLogForm fuelLog={fuelLog} vehicles={vehicles} state={state} />
      <div className="mt-6 flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
