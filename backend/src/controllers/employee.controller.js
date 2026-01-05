const employeeService = require('../services/employee.service');

const employeeController = {

  getAllEmployees: (req, res) => {
    try {
      const employees = employeeService.getAllEmployees();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getEmployeeById: (req, res) => {
    try {
      const employee = employeeService.getEmployeeById(req.params.id);

      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createEmployee: (req, res) => {
    try {
      const { id, name, department, leaveBalance } = req.body;

      // Validation
      if (!name || !department || leaveBalance === undefined) {
        return res.status(400).json({
          error: 'Missing required fields: name, department, leaveBalance'
        });
      }

      if (typeof leaveBalance !== 'number' || leaveBalance < 0) {
        return res.status(400).json({
          error: 'leaveBalance must be a non-negative number'
        });
      }

      const newEmployee = employeeService.createEmployee({ id, name, department, leaveBalance });
      res.status(201).json(newEmployee);
    } catch (error) {
      if (error.message === 'Employee ID already exists') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },

  deleteEmployee: (req, res) => {
    try {
      const result = employeeService.deleteEmployee(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Employee not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = employeeController;

