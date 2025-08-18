import { useState, useEffect } from 'react';
import { getEmployees } from '@/api/employee';
import Card from '@/components/Card';
import { Users, ListTodo, GraduationCap } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import ChartContainer from '@/components/ChartContainer';
function Dashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  useEffect(() => {
    const fetchTotalEmployees = async () => {
      try {
        const response = await getEmployees();
        const data = await response;
        setTotalEmployees(data.length);
      } catch (error) {
        console.error('Error fetching total employees:', error);
      }
    };
    fetchTotalEmployees();
  }, []);
  return (
    <div className='space-y-8'>
      <div className='grid lg:grid-cols-3 w-full gap-8 sm:grid-cols-1 sm:place-items-center'>
        <Card title='Total Employees' value={totalEmployees} Icon={Users} />
        <Card title='Active Tasks' value={totalEmployees} Icon={ListTodo} />
        <Card title='Total Interns' value={totalEmployees} Icon={GraduationCap} />
      </div>
      {/* card for employee activity */}
      <div className='flex px-10 gap-8'>
        <div className='bg-card p-4 rounded-2xl w-2/3 flex flex-col justify-between items-center py-10 px-4'>
          <div className='flex items-center justify-between w-full'>
            <h1 className='text-xl font-bold'>Employee Activity</h1>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select Range' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Yearly'>Yearly</SelectItem>
                <SelectItem value='Quaterly'>Quaterly</SelectItem>
                <SelectItem value='Monthly'>Monthly</SelectItem>
                <SelectItem value='Weekly'>Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='w-full'>
            <ChartContainer month={date?.getMonth() || 0} />
          </div>
        </div>

        <div className='bg-card py-8 px-6 rounded-2xl w-1/3 space-y-4'>
          <h1 className='text-xl font-bold'>Attendance Overview</h1>
          <div className='flex justify-center'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              className='rounded-md border shadow-sm w-2/3'
              captionLayout='label'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
