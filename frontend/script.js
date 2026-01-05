const API_BASE_URL = 'http://localhost:3000';

// Helper function to show messages
function showMessage(text, type = 'success') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 3000);
}

// Helper function to handle API errors
async function handleApiCall(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}



// Add Employee Form Handler
document.getElementById('addEmployeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('employeeName').value;
    const department = document.getElementById('employeeDepartment').value;
    const leaveBalance = parseInt(document.getElementById('employeeLeaveBalance').value);
    
    try {
        const employee = await handleApiCall(`${API_BASE_URL}/employees`, {
            method: 'POST',
            body: JSON.stringify({ name, department, leaveBalance })
        });
        
        showMessage(`Employee "${employee.name}" added successfully!`, 'success');
        document.getElementById('addEmployeeForm').reset();
        
        // Optionally refresh the employees list
        if (document.getElementById('employeesTableContainer').innerHTML) {
            viewAllEmployees();
        }
    } catch (error) {
        showMessage(error.message, 'error');
    }
});

// View All Employees
async function viewAllEmployees() {
    try {
        const employees = await handleApiCall(`${API_BASE_URL}/employees`);
        displayEmployees(employees);
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

document.getElementById('viewEmployeesBtn').addEventListener('click', viewAllEmployees);

// Display Employees in Table
function displayEmployees(employees) {
    const container = document.getElementById('employeesTableContainer');
    
    if (employees.length === 0) {
        container.innerHTML = '<p class="empty-message">No employees found. Add your first employee above!</p>';
        return;
    }
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Leave Balance</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    employees.forEach(emp => {
        html += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td>${emp.leaveBalance}</td>
                <td>
                    <button class="approve-btn" onclick="deleteEmployee(${emp.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

// Delete Employee
async function deleteEmployee(id) {
    if (!confirm(`Are you sure you want to delete employee with ID ${id}?`)) {
        return;
    }
    
    try {
        await handleApiCall(`${API_BASE_URL}/employees/${id}`, {
            method: 'DELETE'
        });
        
        showMessage('Employee deleted successfully!', 'success');
        viewAllEmployees();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// Make deleteEmployee available globally
window.deleteEmployee = deleteEmployee;



// Create Leave Request Form Handler
document.getElementById('createLeaveForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const employeeId = parseInt(document.getElementById('leaveEmployeeId').value);
    const startDate = document.getElementById('leaveStartDate').value;
    const endDate = document.getElementById('leaveEndDate').value;
    const reason = document.getElementById('leaveReason').value;
    
    try {
        const leaveRequest = await handleApiCall(`${API_BASE_URL}/leave`, {
            method: 'POST',
            body: JSON.stringify({ employeeId, startDate, endDate, reason })
        });
        
        showMessage(`Leave request created successfully!`, 'success');
        document.getElementById('createLeaveForm').reset();
        
        // Optionally refresh the leave requests list
        if (document.getElementById('leaveRequestsTableContainer').innerHTML) {
            viewAllLeaveRequests();
        }
    } catch (error) {
        showMessage(error.message, 'error');
    }
});

// View All Leave Requests
async function viewAllLeaveRequests() {
    try {
        const leaveRequests = await handleApiCall(`${API_BASE_URL}/leave`);
        displayLeaveRequests(leaveRequests);
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

document.getElementById('viewLeaveRequestsBtn').addEventListener('click', viewAllLeaveRequests);

// Display Leave Requests in Table
function displayLeaveRequests(leaveRequests) {
    const container = document.getElementById('leaveRequestsTableContainer');
    
    if (leaveRequests.length === 0) {
        container.innerHTML = '<p class="empty-message">No leave requests found. Create your first leave request above!</p>';
        return;
    }
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Employee ID</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    leaveRequests.forEach(leave => {
        const statusClass = leave.status === 'approved' ? 'status-approved' : 'status-pending';
        const approveButton = leave.status === 'pending' 
            ? `<button class="approve-btn" onclick="approveLeaveRequest(${leave.id})">Approve</button>`
            : '';
        
        html += `
            <tr>
                <td>${leave.id}</td>
                <td>${leave.employeeId}</td>
                <td>${new Date(leave.startDate).toLocaleDateString()}</td>
                <td>${new Date(leave.endDate).toLocaleDateString()}</td>
                <td>${leave.reason}</td>
                <td><span class="status-badge ${statusClass}">${leave.status}</span></td>
                <td>${approveButton}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

// Approve Leave Request (Bonus)
async function approveLeaveRequest(id) {
    try {
        await handleApiCall(`${API_BASE_URL}/leave/${id}/approve`, {
            method: 'PATCH'
        });
        
        showMessage('Leave request approved successfully!', 'success');
        viewAllLeaveRequests();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// Make approveLeaveRequest available globally
window.approveLeaveRequest = approveLeaveRequest;

