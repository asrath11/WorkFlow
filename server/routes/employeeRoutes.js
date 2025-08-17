import express from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  InsertManyEmployees,
} from '../controllers/employeeController.js';

const router = express.Router();

// Routes for /api/employees
router.route('/').get(getEmployees).post(createEmployee);

// Routes for /api/employees/:id
router
  .route('/:id')
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route('/insertMany').post(InsertManyEmployees);

export default router;
