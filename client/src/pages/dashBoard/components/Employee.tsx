import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon, TrashIcon, EditIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AddEmployee from './AddEmployee';
import { deleteEmployee, getEmployees } from '@/api/employee';

type Employee = {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
};

function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('newest');
  const filteredEmployees = employees.filter((emp) =>
    emp.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch employees on mount
  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeAdded = () => {
    setIsModalOpen(false);
    fetchEmployees();
  };

  const handleEmployeeDeleted = async (id: string) => {
    await deleteEmployee(id);
    fetchEmployees();
  };
  const sortEmployees = (employees: Employee[]) => {
    const sortedEmployees = [...employees];
    switch (sortKey) {
      case 'newest':
        sortedEmployees.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'name':
        sortedEmployees.sort((a, b) => a.fullName.localeCompare(b.fullName));
        break;
      case 'active':
        sortedEmployees.sort((a, b) => (a.status === 'active' ? -1 : 1));
        break;
      case 'inactive':
        sortedEmployees.sort((a, b) => (a.status === 'inactive' ? -1 : 1));
        break;
      default:
        break;
    }
    return sortedEmployees;
  };
  return (
    <div className='p-4 space-y-4'>
      <h2 className='text-3xl text-primary font-bold'>Employees</h2>

      {/* Controls */}
      <div className='flex gap-2 max-w-md justify-end'>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className='mr-2 h-4 w-4' />
          Add Employee
        </Button>
        <Input
          type='text'
          placeholder='Search'
          className='bg-card'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select onValueChange={(value) => setSortKey(value)}>
          <SelectTrigger className='w-[180px] bg-card'>
            <SelectValue placeholder='Sort by: Newest' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='newest'>Newest</SelectItem>
            <SelectItem value='name'>Name</SelectItem>
            <SelectItem value='active'>Active</SelectItem>
            <SelectItem value='inactive'>Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Employee Table */}
      <div className='p-6 bg-gray-50 rounded-xl shadow'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr>
              <th className='p-3'>Name</th>
              <th className='p-3'>Email</th>
              <th className='p-3'>Role</th>
              <th className='p-3'>Department</th>
              <th className='p-3'>Status</th>
              <th className='p-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortEmployees(filteredEmployees).map((emp, i) => (
              <tr key={i}>
                <td className='p-3'>{emp.fullName}</td>
                <td className='p-3'>{emp.email}</td>
                <td className='p-3'>{emp.role}</td>
                <td className='p-3'>{emp.department}</td>
                <td className='p-3'>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      emp.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                  </span>
                </td>
                <td className='p-3 flex gap-3'>
                  <button className='text-blue-500 hover:text-blue-700 cursor-pointer'>
                    <EditIcon size={18} />
                  </button>
                  <button
                    className='text-red-500 hover:text-red-700 cursor-pointer'
                    onClick={() => handleEmployeeDeleted(emp._id)}
                  >
                    <TrashIcon size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && (
        <AddEmployee
          className='block'
          onClose={() => setIsModalOpen(false)}
          onEmployeeAdded={handleEmployeeAdded}
        />
      )}
    </div>
  );
}

export default Employee;
