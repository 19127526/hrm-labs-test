// In-memory data storage for employees
let employees = [];
let nextEmployeeId = 1;

// Helper function to find employee by ID
const findEmployeeById = (id) => {
  return employees.find(emp => emp.id === parseInt(id));
};

const employeeService = {
  // Get all employees
  getAllEmployees: () => {
    return employees;
  },

  // Get employee by ID
  getEmployeeById: (id) => {
    return findEmployeeById(id);
  },

  // Create new employee
  createEmployee: (employeeData) => {
    const { id, name, department, leaveBalance } = employeeData;
    
    // If ID is provided, use it; otherwise generate one
    const employeeId = id ? parseInt(id) : nextEmployeeId++;
    
    // Check if ID already exists
    if (findEmployeeById(employeeId)) {
      throw new Error('Employee ID already exists');
    }
    
    const newEmployee = {
      id: employeeId,
      name,
      department,
      leaveBalance
    };
    
    employees.push(newEmployee);
    return newEmployee;
  },

  // Delete employee by ID
  deleteEmployee: (id) => {
    const employeeId = parseInt(id);
    const employeeIndex = employees.findIndex(emp => emp.id === employeeId);
    
    if (employeeIndex === -1) {
      throw new Error('Employee not found');
    }
    
    employees.splice(employeeIndex, 1);
    return { message: 'Employee deleted successfully' };
  },

  // Update employee leave balance (used when creating leave request)
  updateEmployeeLeaveBalance: (id, newBalance) => {
    const employee = findEmployeeById(id);
    if (employee) {
      employee.leaveBalance = newBalance;
      return employee;
    }
    throw new Error('Employee not found');
  }
};

module.exports = employeeService;

