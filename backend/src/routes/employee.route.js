const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

// GET /employees - Get all employees
router.get('/', employeeController.getAllEmployees);

// GET /employees/:id - Get single employee by ID
router.get('/:id', employeeController.getEmployeeById);

// POST /employees - Add new employee
router.post('/', employeeController.createEmployee);

// DELETE /employees/:id - Delete employee by ID
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;

