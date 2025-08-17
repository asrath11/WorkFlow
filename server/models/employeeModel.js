import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
  },
  department: {
    type: String,
    enum: ['HR', 'IT', 'Marketing', 'Finance', 'Sales'],
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
