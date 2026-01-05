const leaveRequestService = require('../services/leaveRequest.service');
const employeeService = require('../services/employee.service');

const leaveRequestController = {

  createLeaveRequest: (req, res) => {
    try {
      const { employeeId, startDate, endDate, reason } = req.body;

      // Validation
      if (!employeeId || !startDate || !endDate || !reason) {
        return res.status(400).json({
          error: 'Missing required fields: employeeId, startDate, endDate, reason'
        });
      }

      const employee = employeeService.getEmployeeById(employeeId);

      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      // Check if employee has enough leave balance
      if (employee.leaveBalance <= 0) {
        return res.status(400).json({
          error: 'Employee has no leave balance remaining'
        });
      }

      // Validate dates
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }

      if (start > end) {
        return res.status(400).json({ error: 'Start date must be before end date' });
      }

      // Create leave request
      const newLeaveRequest = leaveRequestService.createLeaveRequest({
        employeeId,
        startDate,
        endDate,
        reason
      });

      // Reduce employee's leave balance by 1
      employeeService.updateEmployeeLeaveBalance(employeeId, employee.leaveBalance - 1);

      res.status(201).json(newLeaveRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllLeaveRequests: (req, res) => {
    try {
      const leaveRequests = leaveRequestService.getAllLeaveRequests();
      res.status(200).json(leaveRequests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  approveLeaveRequest: (req, res) => {
    try {
      const leaveRequest = leaveRequestService.approveLeaveRequest(req.params.id);
      res.status(200).json(leaveRequest);
    } catch (error) {
      if (error.message === 'Leave request not found') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Leave request is already approved') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = leaveRequestController;

