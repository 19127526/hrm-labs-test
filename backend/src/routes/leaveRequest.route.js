const express = require('express');
const router = express.Router();
const leaveRequestController = require('../controllers/leaveRequest.controller');

// POST /leave - Create leave request
router.post('/', leaveRequestController.createLeaveRequest);

// GET /leave - Get all leave requests
router.get('/', leaveRequestController.getAllLeaveRequests);

// PATCH /leave/:id/approve - Approve leave request
router.patch('/:id/approve', leaveRequestController.approveLeaveRequest);

module.exports = router;

