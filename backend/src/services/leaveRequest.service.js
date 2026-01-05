// In-memory data storage for leave requests
let leaveRequests = [];
let nextLeaveId = 1;

// Helper function to find leave request by ID
const findLeaveRequestById = (id) => {
  return leaveRequests.find(leave => leave.id === parseInt(id));
};

const leaveRequestService = {
  // Get all leave requests
  getAllLeaveRequests: () => {
    return leaveRequests;
  },

  // Get leave request by ID
  getLeaveRequestById: (id) => {
    return findLeaveRequestById(id);
  },

  // Create new leave request
  createLeaveRequest: (leaveData) => {
    const { employeeId, startDate, endDate, reason } = leaveData;
    
    const newLeaveRequest = {
      id: nextLeaveId++,
      employeeId: parseInt(employeeId),
      startDate,
      endDate,
      reason,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    leaveRequests.push(newLeaveRequest);
    return newLeaveRequest;
  },

  // Approve leave request
  approveLeaveRequest: (id) => {
    const leaveRequest = findLeaveRequestById(id);
    
    if (!leaveRequest) {
      throw new Error('Leave request not found');
    }
    
    if (leaveRequest.status === 'approved') {
      throw new Error('Leave request is already approved');
    }
    
    leaveRequest.status = 'approved';
    return leaveRequest;
  }
};

module.exports = leaveRequestService;

