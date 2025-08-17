import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface Employee {
  _id?: string;
  fullName: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
}

// Get all employees
export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/employees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

// Get single employee by ID
export const getEmployeeById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error);
    throw error;
  }
};

// Create new employee
export const createEmployee = async (employeeData: Omit<Employee, '_id'>) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/employees`,
      employeeData
    );
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

// Update employee
export const updateEmployee = async (
  id: string,
  employeeData: Partial<Employee>
) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/v1/employees/${id}`,
      employeeData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with ID ${id}:`, error);
    throw error;
  }
};

// Delete employee
export const deleteEmployee = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/api/v1/employees/${id}`);
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    throw error;
  }
};
