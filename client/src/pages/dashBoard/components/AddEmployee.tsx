import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { createEmployee } from '@/api/employee';
import { roles, departments } from '@/utils/employee';
import { useState } from 'react';

interface EmployeeFormData {
  fullName: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
}

function AddEmployee({
  className,
  onClose,
  onEmployeeAdded,
}: {
  className?: string;
  onClose: () => void;
  onEmployeeAdded: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, setValue } = useForm<EmployeeFormData>();

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      setIsSubmitting(true);
      await createEmployee(data);
      onEmployeeAdded();
      onClose();
    } catch (error) {
      console.error('Error adding employee:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-3xl w-[70vw] h-[82vh] bg-gradient-to-br from-primary/20 via-red-50 to-red-50 ${className} rounded-2xl`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white p-6 rounded-2xl shadow-xl w-[400px] space-y-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '
      >
        <h1 className='text-2xl font-bold text-primary'>Add Employee</h1>

        {/* Full Name */}
        <div>
          <Label htmlFor='fullName'>Full Name</Label>
          <Input type='text' id='fullName' {...register('fullName')} required />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input type='email' id='email' {...register('email')} required />
        </div>

        {/* Role + Department */}
        <div className='flex gap-2'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='role'>Role</Label>
            <Select onValueChange={(value) => setValue('role', value)}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select a role' />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.name}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='department'>Department</Label>
            <Select onValueChange={(value) => setValue('department', value)}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select department' />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.name}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex gap-2 justify-end'>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full md:w-auto'
          >
            {isSubmitting ? 'Adding...' : 'Add Employee'}
          </Button>
          <Button type='button' variant='outline' onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
