import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { attendanceData } from "../data/mockData";

function AttendanceTracking({ employees }) {
  const [attendance, setAttendance] = useState(attendanceData);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const handleCheckIn = () => {
    if (!selectedEmployee) {
      toast.error("Please select an employee");
      return;
    }

    const existingAttendance = attendance.find(
      (a) => a.employeeId === parseInt(selectedEmployee) && a.date === today
    );

    if (existingAttendance) {
      toast.error("Employee has already checked in today");
      return;
    }

    const newAttendance = {
      id: attendance.length + 1,
      employeeId: parseInt(selectedEmployee),
      date: today,
      checkIn: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      checkOut: "",
      status: "Present",
    };

    setAttendance([...attendance, newAttendance]);
    toast.success("Check-in recorded successfully");
  };

  const handleCheckOut = () => {
    if (!selectedEmployee) {
      toast.error("Please select an employee");
      return;
    }

    const updatedAttendance = attendance.map((record) => {
      if (
        record.employeeId === parseInt(selectedEmployee) &&
        record.date === today &&
        !record.checkOut
      ) {
        return {
          ...record,
          checkOut: new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      }
      return record;
    });

    if (JSON.stringify(updatedAttendance) === JSON.stringify(attendance)) {
      toast.error("No active check-in found for today");
      return;
    }

    setAttendance(updatedAttendance);
    toast.success("Check-out recorded successfully");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Record Attendance
        </h3>
        <div className="flex gap-4 mb-4">
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleCheckIn}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Check In
          </button>
          <button
            onClick={handleCheckOut}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Check Out
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <h3 className="text-lg font-semibold text-gray-900 p-6 pb-0">
          Today's Attendance
        </h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendance
                .filter((record) => record.date === today)
                .map((record) => {
                  const employee = employees.find(
                    (emp) => emp.id === record.employeeId
                  );
                  return (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {employee?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.checkIn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.checkOut || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AttendanceTracking;
