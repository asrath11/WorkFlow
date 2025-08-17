import Employee from '../models/employeeModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import { EmployeeData } from '../utils/employee.js';

const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({});
  res.status(200).json(employees);
});

const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  res.status(200).json(employee);
});

const createEmployee = asyncHandler(async (req, res) => {
  const { fullName, email, role, department, status } = req.body;

  const employee = await Employee.create({
    fullName,
    email,
    role,
    department,
    status: status || 'active',
  });

  const createdEmployee = await employee.save();
  res.status(201).json(createdEmployee);
});

const updateEmployee = asyncHandler(async (req, res) => {
  const { fullName, email, role, department, status } = req.body;

  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    {
      fullName,
      email,
      role,
      department,
      status,
    },
    {
      new: true,
    }
  );

  if (!updatedEmployee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  res.status(200).json(updatedEmployee);
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  res.status(200).json({ message: 'Employee removed', employee });
});

const InsertManyEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.insertMany(EmployeeData);
  res.status(200).json(employees);
});

export {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  InsertManyEmployees,
};
