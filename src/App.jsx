import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Dashboard from './components/Dashboard'
import EmployeeList from './components/EmployeeList'
import AddEmployee from './components/AddEmployee'
import Login from './components/Login'
import Layout from './components/Layout'
import { employeesData } from './data/mockData'

function App() {
  const [employees, setEmployees] = useState(employeesData)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: employees.length + 1 }])
  }

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <Login onLogin={() => setIsAuthenticated(true)} />
          } 
        />
        <Route
          element={
            isAuthenticated ? 
            <Layout onLogout={() => setIsAuthenticated(false)} /> : 
            <Navigate to="/login" replace />
          }
        >
          <Route path="/" element={<Dashboard employees={employees} />} />
          <Route path="/employees" element={<EmployeeList employees={employees} />} />
          <Route path="/add-employee" element={<AddEmployee onAdd={addEmployee} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App