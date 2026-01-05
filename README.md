# HRM Management System

Simple HRM demo project including a REST API backend and a basic web
frontend.

## Project Structure

    .
    ├── backend/    # Node.js + Express backend
    └── frontend/   # HTML / CSS / JavaScript frontend

## How to Run Backend

``` bash
cd backend
npm install
npm start
```

Backend will run at:

    http://localhost:3000

## How to Open Frontend

Open the following file directly in your browser:

    frontend/index.html

If you encounter CORS issues, use a local static server (e.g. Live
Server or Python http.server).

## Example API Usage

### Employees

#### Get all employees

``` bash
curl http://localhost:3000/employees
```

#### Get employee by ID

``` bash
curl http://localhost:3000/employees/1
```

#### Create an employee

``` bash
curl -X POST http://localhost:3000/employees   -H "Content-Type: application/json"   -d '{"name":"John Doe","department":"IT","leaveBalance":10}'
```

#### Delete an employee

``` bash
curl -X DELETE http://localhost:3000/employees/1
```

### Leave Requests

#### Get all leave requests

``` bash
curl http://localhost:3000/leave
```

#### Create a leave request

``` bash
curl -X POST http://localhost:3000/leave   -H "Content-Type: application/json"   -d '{"employeeId":1,"startDate":"2026-01-10","endDate":"2026-01-12","reason":"Vacation"}'
```

#### Approve a leave request

``` bash
curl -X PATCH http://localhost:3000/leave/1/approve
```
 
